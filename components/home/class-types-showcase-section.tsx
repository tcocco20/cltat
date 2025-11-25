import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClassType } from "@/lib/types";
import Link from "next/link";
import RequestInfoButton from "../general/request-info-button";

interface ClassTypesShowcaseSectionProps {
  classTypes: ClassType[];
}

export default function ClassTypesShowcaseSection({
  classTypes,
}: ClassTypesShowcaseSectionProps) {
  const fallbackMessage = (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>No Class Type Information Available</CardTitle>
        <CardDescription>
          Please check back later for more information on our class offerings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg">
          We will be offering certification classes for armed security and
          unarmed security and we will be updating our class types soon. In the
          meantime, feel free to reach out to us with any questions regarding
          our business or future class offerings.
        </p>
      </CardContent>
      <CardFooter>
        <RequestInfoButton>Contact Us</RequestInfoButton>
      </CardFooter>
    </Card>
  );

  return (
    <section className="container flex mx-auto w-full flex-col gap-4 items-center px-2">
      <h2 className="text-2xl font-bold my-4 self-start">Class Types</h2>
      {classTypes.length ? (
        <Tabs defaultValue={classTypes[0]?.slug} className="w-full">
          <TabsList className="max-w-full overflow-x-scroll no-scrollbar justify-start">
            {classTypes.map((classType) => (
              <TabsTrigger key={classType.slug} value={classType.slug}>
                {classType.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {classTypes.length > 1 && (
            <p className="text-foreground/80 text-sm mb-4">
              Scroll to see more options
            </p>
          )}
          {classTypes.map((classType) => (
            <TabsContent
              key={classType.slug}
              value={classType.slug}
              className="space-x-2"
            >
              <Card className="text-center md:space-y-4 max-w-2xl lg:w-1/2">
                <CardHeader className="md:space-y-2">
                  <CardTitle>{classType.name}</CardTitle>
                  {classType.subtitle && (
                    <CardDescription>{classType.subtitle}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="overflow-y-auto max-h-96">
                  <div
                    className="text-lg"
                    dangerouslySetInnerHTML={{ __html: classType.description }}
                  />
                </CardContent>
                <CardFooter className="justify-center">
                  <Button size={"lg"} asChild>
                    <Link href={`/sign-up?classType=${classType.slug}`}>
                      Sign Up
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        fallbackMessage
      )}
    </section>
  );
}
