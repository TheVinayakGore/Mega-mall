"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "John Doe",
    avatar: "/vinu.png",
    comment:
      "Mega Mall has the best deals! I always find what I need at great prices.",
  },
  {
    name: "Jane Smith",
    avatar: "/vinu.png",
    comment: "The customer service is amazing, and the delivery is super fast!",
  },
  {
    name: "Alice Johnson",
    avatar: "/vinu.png",
    comment: "I love the variety of products available. Highly recommended!",
  },
];

const Testimonials = () => {
  return (
    <>
      <main className="w-full">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <CardTitle>{testimonial.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {testimonial.comment}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
};

export default Testimonials;
