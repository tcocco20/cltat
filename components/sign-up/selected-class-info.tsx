import React from "react";
import { Card, CardContent } from "../ui/card";
import { ClassData } from "@/lib/types";
import Link from "next/link";

interface SelectedClassInfoProps {
  selectedClass?: ClassData | string;
}

const SelectedClassInfo = ({ selectedClass }: SelectedClassInfoProps) => {
  const noClassSelected = (
    <>
      <h2 className="text-lg md:text-xl xl:text-2xl font-semibold">
        No Class Selected
      </h2>
      <p className="text-muted-foreground">
        Please select a class to see more information.
      </p>
    </>
  );
  return (
    <Card>
      <CardContent>
        {selectedClass ? (
          <div className="space-y-4">
            <h2 className="text-lg md:text-xl xl:text-2xl font-semibold">
              CPR/First Aid
            </h2>
            <p className="text-red-500">Jan 6, 2026</p>
            <p className="font-semibold lg:text-lg">Price per spot: $200</p>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
              cupiditate sint, quam molestiae eaque quis laborum est earum
              dignissimos, quasi amet voluptas veniam dolorum fugit labore
              dolores, saepe placeat minus incidunt eligendi aspernatur
              accusamus!
            </p>
            <p>
              Location Type: <span className="font-semibold">In-Person</span>
            </p>
            <div>
              <p className="font-semibold">Location:</p>
              <Link
                href="#"
                target="_blank"
                className="text-blue-500 font-semibold"
              >
                123 Main St, Anytown, USA
              </Link>
            </div>
          </div>
        ) : (
          noClassSelected
        )}
      </CardContent>
    </Card>
  );
};

export default SelectedClassInfo;
