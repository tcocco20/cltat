import { File } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { LicenseData } from "@/lib/types";

interface ShowLicenseButtonProps {
  licenses: LicenseData[];
}

const ShowLicenseButton = ({ licenses }: ShowLicenseButtonProps) => {
  return (
    <div className="flex items-center justify-center cursor-pointer">
      <Dialog>
        <div className="flex flex-col items-center">
          <DialogTrigger asChild>
            <div className="w-24 h-24 rounded-full bg-emerald-300 flex items-center justify-center cursor-pointer">
              <File height={48} width={48} />
            </div>
          </DialogTrigger>
          <h3 className="text-center text-xl font-semibold whitespace-nowrap my-4">
            View Licenses
          </h3>
        </div>
        <DialogContent className="w-full max-w-6xl!">
          <DialogHeader>
            <DialogTitle>View licenses and certifications</DialogTitle>
            <hr className="border-black" />
          </DialogHeader>
          {licenses.length ? (
            <Tabs defaultValue={licenses[0].slug}>
              <TabsList className="p-2">
                {licenses.map((license) => (
                  <TabsTrigger key={license.slug} value={license.slug}>
                    {license.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {licenses.map((license) => (
                <TabsContent key={license.slug} value={license.slug}>
                  {license.mediaItemUrl ? (
                    <iframe
                      src={license.mediaItemUrl}
                      title={license.title}
                      className="w-full h-[70vh] border rounded"
                    />
                  ) : (
                    <>
                      <h2 className="text-2xl font-medium">
                        License document not available.
                      </h2>
                      <p>
                        No PDF is currently available for {license.title}. We
                        will be uploading one soon. Please contact us using the
                        form above if you need immediate assistance.
                      </p>
                    </>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <div className="p-4">
              <h2 className="text-2xl font-medium">
                License Data Coming Soon!
              </h2>
              <p>
                There are no licenses or certifications available for viewing at
                this time. Please check back later or contact us for more
                information.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShowLicenseButton;
