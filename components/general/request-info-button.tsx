import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";

interface RequestInfoButtonProps {
  children: ReactNode;
}

const RequestInfoButton = ({ children }: RequestInfoButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Us</DialogTitle>
          <DialogDescription>
            If you have any questions or need further information, please
            don&lsquo;t hesitate to reach out to us.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Link
            href="mailto:info@cornerstone-legacy.com"
            className="flex-1 hover:scale-105 transition-transform duration-200"
          >
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Email Us</CardTitle>
                <CardDescription>info@cornerstone-legacy.com</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Mail className="h-12 w-12" />
              </CardContent>
            </Card>
          </Link>
          <Link
            href="tel:+19169137117"
            className="flex-1 hover:scale-105 transition-transform duration-200"
          >
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Call Us</CardTitle>
                <CardDescription>+1 (916) 913-7117</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Phone className="h-12 w-12" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestInfoButton;
