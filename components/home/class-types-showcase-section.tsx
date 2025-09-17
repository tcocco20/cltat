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

export default function ClassTypesShowcaseSection() {
  const fallbackClassTypes = [
    {
      slug: "mental-health-first-aid",
      type: "Mental Health and First Aid",
      description:
        "Learn how to handle mental health crises and provide first aid.",
      information:
        "This course covers the basics of mental health first aid, including how to recognize and respond to mental health crises. Classes typically run about 8 hours and may be in person or remote.",
    },
    {
      slug: "armed-security",
      type: "Armed Security",
      description: "Learn the skills necessary to work in armed security.",
      information:
        "This course provides an overview of the skills and knowledge required for a career in armed security. Classes typically run about 8 hours and must be in person at a shooting range.",
    },
    {
      slug: "unarmed-security",
      type: "Unarmed Security",
      description: "Learn the skills necessary to work in unarmed security.",
      information:
        "This course provides an overview of the skills and knowledge required for a career in unarmed security. Classes typically run about 8 hours and may be in person or remote.",
    },
    {
      slug: "armed-security-refresher",
      type: "Armed Security Refresher",
      description: "Refresh your knowledge and skills in armed security.",
      information:
        "This course is designed for individuals who have previously completed an armed security training program and need to refresh their knowledge and skills. Classes typically run about 4 hours and must be in person at a shooting range.",
    },
    {
      slug: "unarmed-security-refresher",
      type: "Unarmed Security Refresher",
      description: "Refresh your knowledge and skills in unarmed security.",
      information:
        "This course is designed for individuals who have previously completed an unarmed security training program and need to refresh their knowledge and skills. Classes typically run about 4 hours and may be in person or remote.",
    },
    {
      slug: "asp",
      type: "ASP",
      description:
        "Learn about the ASP (Advanced Security Professional) certification.",
      information:
        "This course provides an overview of the skills and knowledge required for the ASP certification. Classes typically run about 8 hours and may be in person or remote.",
    },
  ];
  return (
    <section className="flex mx-auto w-full max-w-3xl flex-col gap-4 items-center px-2 md:px-0">
      <h2 className="text-2xl font-bold my-4 self-start">Class Types</h2>
      <Tabs defaultValue="mental-health-first-aid" className="w-full">
        <TabsList className="w-full overflow-x-scroll no-scrollbar justify-start">
          {fallbackClassTypes.map((classType) => (
            <TabsTrigger key={classType.slug} value={classType.slug}>
              {classType.type}
            </TabsTrigger>
          ))}
        </TabsList>
        <p className="text-foreground/80 text-sm mb-4">
          Scroll to see more options
        </p>
        {fallbackClassTypes.map((classType) => (
          <TabsContent key={classType.slug} value={classType.slug}>
            <Card className="text-center md:space-y-4">
              <CardHeader className="md:space-y-2">
                <CardTitle>{classType.type}</CardTitle>
                {classType.description && (
                  <CardDescription>{classType.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="px-12">
                <p className="text-lg">{classType.information}</p>
              </CardContent>
              <CardFooter className="justify-center">
                <Button size={"lg"}>Sign Up</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
