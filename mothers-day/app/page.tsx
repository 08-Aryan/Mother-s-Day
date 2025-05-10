"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, Gift, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Gift data
const gifts = [
  {
    id: 1,
    name: "Purse",
    image: "https://m.media-amazon.com/images/I/71qBhUNjcyL._AC_UL640_QL65_.jpg",
    description: "A beautiful purse that's both stylish and practical.",
  },
  {
    id: 2,
    name: "Jewelry Set",
    image: "https://m.media-amazon.com/images/I/71ooQyvpGCL._AC_UL640_QL65_.jpg",
    description: "An elegant jewelry set to make her feel special.",
  },
  {
    id: 3,
    name: "Watch",
    image: "https://m.media-amazon.com/images/I/81jVNXMKhEL._AC_UL640_QL65_.jpg",
    description: "A sophisticated watch that combines style and functionality.",
  },
  {
    id: 4,
    name: "Perfume",
    image: "https://m.media-amazon.com/images/I/61Z0HyOvTfL._AC_UL640_QL65_.jpg",
    description: "A delightful fragrance that lasts all day.",
  },
]

// Flower data for the virtual bouquet
const flowers = [
  { name: "Rose", meaning: "For your endless love", emoji: "🌹" },
  { name: "Tulip", meaning: "For your warmth and grace", emoji: "🌷" },
  { name: "Daisy", meaning: "For your cheerful spirit", emoji: "🌼" },
  { name: "Sunflower", meaning: "For always being my sunshine", emoji: "🌻" },
  { name: "Lavender", meaning: "For your calm and comfort", emoji: "💐" },
]

export default function Home() {
  const [selectedGift, setSelectedGift] = useState<(typeof gifts)[0] | null>(null)
  const [currentGiftIndex, setCurrentGiftIndex] = useState(0)
  const [showBouquet, setShowBouquet] = useState(false)

  const handlePrevGift = () => {
    setCurrentGiftIndex((prev) => (prev === 0 ? gifts.length - 1 : prev - 1))
  }

  const handleNextGift = () => {
    setCurrentGiftIndex((prev) => (prev === gifts.length - 1 ? 0 : prev + 1))
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      {/* Header */}
      <header className="py-6 text-center bg-gradient-to-r from-pink-200 to-purple-200">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-700">Happy Mother&apos;s Day</h1>
        <p className="mt-2 text-lg text-pink-600">A special celebration for the most amazing mom</p>
      </header>

      {/* Hero Section with Mom's Image */}
      <section className="py-12 px-4 max-w-5xl mx-auto text-center">
        <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-8 rounded-full overflow-hidden border-8 border-pink-200 shadow-lg">
          {/* Replace this with your mother's image */}
          <Image src="/images/mother.png" alt="My Beautiful Mother" fill className="object-cover" priority />
        </div>
        <h2 className="text-3xl font-bold text-pink-700 mb-4">To My Wonderful Mom (The Cuttest Pigga)</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Thank you for your endless love, support, and all the sacrifices you&apos;ve made. You are the heart of our
          family and I&apos;m so grateful for you every day.
        </p>
      </section>

      {/* Gift Selection Section */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-8">Choose a Special Gift</h2>

        <div className="relative max-w-md mx-auto">
          <Card className="border-pink-200 shadow-lg">
            <CardContent className="p-6">
              <div className="relative h-64 w-full mb-4">
                <Image
                  src={gifts[currentGiftIndex].image || "/placeholder.svg"}
                  alt={gifts[currentGiftIndex].name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-center text-pink-700 mb-2">{gifts[currentGiftIndex].name}</h3>

              <div className="flex justify-center mt-4 space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrevGift}
                  className="rounded-full border-pink-300 text-pink-700 hover:bg-pink-100"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  onClick={() => setSelectedGift(gifts[currentGiftIndex])}
                  className="bg-pink-600 hover:bg-pink-700 text-white"
                >
                  Select This Gift
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNextGift}
                  className="rounded-full border-pink-300 text-pink-700 hover:bg-pink-100"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gift Details Dialog */}
        {selectedGift && (
          <Dialog open={!!selectedGift} onOpenChange={(open) => !open && setSelectedGift(null)}>
            <DialogContent className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
              <DialogHeader>
                <DialogTitle className="text-2xl text-pink-700">Your Selected Gift</DialogTitle>
                <DialogDescription>A perfect choice to show your love!</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center p-4">
                <div className="relative h-48 w-48 mb-4">
                  <Image
                    src={selectedGift.image || "/placeholder.svg"}
                    alt={selectedGift.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-pink-700 mb-2">{selectedGift.name}</h3>
                <p className="text-gray-700 text-center mb-4">{selectedGift.description}</p>
                <div className="flex space-x-4">
                  <Button
                    className="bg-pink-600 hover:bg-pink-700 text-white"
                    onClick={() => {
                      alert(`Gift "${selectedGift.name}" has been added to your cart!`)
                      setSelectedGift(null)
                    }}
                  >
                    <Gift className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    className="border-pink-300 text-pink-700 hover:bg-pink-100"
                    onClick={() => setSelectedGift(null)}
                  >
                    Choose Another
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </section>

      {/* Virtual Bouquet Section */}
      <section className="py-12 px-4 max-w-5xl mx-auto text-center bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg shadow-inner mb-12">
        <h2 className="text-3xl font-bold text-pink-700 mb-4">💐 Virtual Bouquet for Mom 💐</h2>
        <p className="text-lg text-pink-600 mb-8">A little garden of love, blooming just for you</p>

        <Button onClick={() => setShowBouquet(!showBouquet)} className="bg-pink-600 hover:bg-pink-700 text-white mb-6">
          <Heart className="mr-2 h-4 w-4" />
          {showBouquet ? "Hide Bouquet" : "View Bouquet"}
        </Button>

        {showBouquet && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {flowers.map((flower, index) => (
              <Card
                key={index}
                className="border-pink-200 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="text-5xl mb-2">{flower.emoji}</div>
                  <h3 className="text-xl font-bold text-pink-700">{flower.name}</h3>
                  <p className="text-gray-700 mt-2">{flower.meaning}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="py-6 text-center bg-gradient-to-r from-pink-200 to-purple-200">
        <p className="text-pink-700">Made with ❤️ for the best mom in the world</p>
      </footer>
    </main>
  )
}
