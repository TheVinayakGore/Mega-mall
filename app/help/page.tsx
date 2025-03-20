"use client";
import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Phone, Mail, MapPin } from "lucide-react";

const page = () => {
  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "You can place an order by browsing our products, adding them to your cart, and proceeding to checkout.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and Apple Pay.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you will receive a tracking number via email.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy. Please contact us for more details.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary depending on your location.",
    },
    {
      question: "How can I cancel or modify my order?",
      answer:
        "You can cancel or modify your order within 24 hours of placing it. Contact our support team for assistance.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-28 text-lg"
    >
      <h1 className="inline-flex text-9xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-fuchsia-500 mb-14 h-full">
        Help Center
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* FAQ Section */}
        <Card className="shadow-xl">
          <CardHeader className="border-b pb-5 mb-5">
            <CardTitle className="text-2xl">
              Frequently Asked Questions
            </CardTitle>
            <CardDescription className="text-base">
              Find answers to common questions about our services and policies.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              {faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-base">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm mt-2">
                    {faq.answer}
                  </p>
                  {index !== faqs.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Contact Us</CardTitle>
            <CardDescription className="text-base">
              Have a question? Send us a message, and we will get back to you as
              soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Your phone number"
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-base">
                  Subject
                </Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Subject of your message"
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-base">
                  Message
                </Label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder="Your message"
                  className="text-sm"
                />
              </div>
              <Button type="submit" className="w-full text-lg">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Additional Information Section */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <Alert className="shadow-xl">
          <Phone className="h-6 w-6" />
          <div className="flex flex-col ml-3">
            <AlertTitle className="text-xl">Call Us</AlertTitle>
            <AlertDescription className="text-lg">
              For immediate assistance, call us at{" "}
              <span className="font-semibold">+1 (800) 123-4567</span>.
            </AlertDescription>
          </div>
        </Alert>
        <Alert className="shadow-xl">
          <Mail className="h-6 w-6" />
          <div className="flex flex-col ml-3">
            <AlertTitle className="text-xl">Email Us</AlertTitle>
            <AlertDescription className="text-lg">
              Send us an email at{" "}
              <span className="font-semibold">support@example.com</span>.
            </AlertDescription>
          </div>
        </Alert>
        <Alert className="shadow-xl">
          <MapPin className="h-6 w-6" />
          <div className="flex flex-col ml-3">
            <AlertTitle className="text-xl">Visit Us</AlertTitle>
            <AlertDescription className="text-lg">
              Our office is located at{" "}
              <span className="font-semibold">123 Main St, City, Country</span>.
            </AlertDescription>
          </div>
        </Alert>
      </div>
    </motion.div>
  );
};

export default page;
