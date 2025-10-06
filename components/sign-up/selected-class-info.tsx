import React from "react";
import { Card, CardContent } from "../ui/card";
import { ClassData } from "@/lib/types";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import SignUpButton from "./sign-up-button";

interface SelectedClassInfoProps {
  selectedClass: ClassData | null;
}

const SelectedClassInfo = ({ selectedClass }: SelectedClassInfoProps) => {
  const noClassSelected = (
    <div className="text-center">
      <h2 className="text-lg md:text-xl xl:text-2xl font-semibold">
        No Class Selected
      </h2>
      <p className="text-muted-foreground">
        Please select a class to see more information.
      </p>
    </div>
  );

  return (
    <Card className="h-full flex flex-col justify-center">
      <CardContent>
        {selectedClass ? (
          <div className="space-y-4">
            <h2 className="text-lg md:text-xl xl:text-2xl font-semibold">
              {selectedClass.type}
            </h2>
            <p className="text-red-500">
              {selectedClass.date.toDateString()}{" "}
              {selectedClass.date.toLocaleTimeString()}
              {selectedClass.endDate
                ? ` - ${selectedClass.endDate.toDateString()} ${selectedClass.endDate.toLocaleTimeString()}`
                : ""}
            </p>
            <p className="font-semibold lg:text-lg">
              Price per spot: {formatPrice(selectedClass.cost)}
            </p>
            <p>
              Spots remaining:{" "}
              <span className="font-semibold">
                {selectedClass.totalSpots - selectedClass.spotsTaken}
              </span>
            </p>
            <p>Total Spots: {selectedClass.totalSpots}</p>
            <p className="text-muted-foreground">{selectedClass.description}</p>
            <p>
              Location Type:{" "}
              <span className="font-semibold">
                {selectedClass.isRemote ? "Remote" : "In-Person"}
              </span>
            </p>
            <div>
              {selectedClass.isRemote ? (
                <p className="font-semibold">
                  Class link will be sent via email after signing up
                </p>
              ) : (
                <>
                  <p className="font-semibold">Location:</p>
                  <Link
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      selectedClass.location
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 font-semibold hover:underline"
                  >
                    {selectedClass.location}
                  </Link>
                </>
              )}
            </div>
            <SignUpButton
              isDisabled={
                selectedClass.totalSpots - selectedClass.spotsTaken === 0
              }
              classId={selectedClass.id}
              cost={selectedClass.cost}
            />
          </div>
        ) : (
          noClassSelected
        )}
      </CardContent>
    </Card>
  );
};

export default SelectedClassInfo;
