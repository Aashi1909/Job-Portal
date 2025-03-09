import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { Car } from 'lucide-react'

const category =[
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Data Scientist",
    "Mobile Developer",
    "DevOps Engineer",
    "Cloud Engineer",
    "Product Manager",
    "QA Engineer",
    "Cybersecurity Analyst",
    "Blockchain Developer",
    "Artificial Intelligence (AI) Engineer",
    "Machine Learning Engineer",
    "Robotics Engineer",
    "Data Engineer",
    "Game Developer",
    "Digital Marketing Specialist",
    "Content Writer",
    "Social Media Manager",
    "Video Editor",
    "Graphic Designer",
]
const CategoryCarousel = () => {
  return (
    <div>
        <Carousel className="w-full max-w-xl mx-auto my-20 ">
            <CarouselContent>
                {
                    category.map((item, index) => (
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3 ">
                        <Button  variant="outline" className="rounded-full bg-red-100">{item}</Button>
                    </CarouselItem>
                ))

                }
               
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />

        </Carousel>
      
    </div>
  )
}

export default CategoryCarousel
