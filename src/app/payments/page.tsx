"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
/*import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";*/
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const PaymentForm = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    postalCode: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would integrate with Square's API to process the payment
    console.log('Payment submitted:', paymentDetails);
    // Implement actual Square payment processing logic here
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>Enter your payment information securely.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input 
                id="cardNumber" 
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={paymentDetails.cardNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="expirationDate">Expiration Date</Label>
              <Input 
                id="expirationDate" 
                name="expirationDate"
                placeholder="MM/YY"
                value={paymentDetails.expirationDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="cvv">CVV</Label>
              <Input 
                id="cvv" 
                name="cvv"
                placeholder="123"
                value={paymentDetails.cvv}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input 
                id="postalCode" 
                name="postalCode"
                placeholder="12345"
                value={paymentDetails.postalCode}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSubmit}>Pay Now</Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentForm;