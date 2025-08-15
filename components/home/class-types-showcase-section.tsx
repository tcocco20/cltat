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
  const classTypes = [
    {
      slug: "mental-health-first-aid",
      type: "Mental Health/First Aid",
      description:
        "Learn how to handle mental health crises and provide first aid.",
    },
    {
      slug: "armed-security",
      type: "Armed Security",
      description: "Learn the skills necessary to work in armed security.",
    },
    {
      slug: "unarmed-security",
      type: "Unarmed Security",
      description: "Learn the skills necessary to work in unarmed security.",
    },
    {
      slug: "armed-security-refresher",
      type: "Armed Security Refresher",
      description: "Refresh your knowledge and skills in armed security.",
    },
    {
      slug: "unarmed-security-refresher",
      type: "Unarmed Security Refresher",
      description: "Refresh your knowledge and skills in unarmed security.",
    },
    {
      slug: "asp",
      type: "ASP",
      description:
        "Learn about the ASP (Advanced Security Professional) certification.",
    },
  ];
  return (
    <div className="flex mx-auto w-full max-w-xl flex-col gap-4 items-center">
      <h2 className="text-2xl font-bold my-4">Class Types</h2>
      <Tabs defaultValue="mental-health-first-aid">
        <TabsList>
          {classTypes.map((classType) => (
            <TabsTrigger key={classType.slug} value={classType.slug}>
              {classType.type}
            </TabsTrigger>
          ))}
        </TabsList>
        {classTypes.map((classType) => (
          <TabsContent key={classType.slug} value={classType.slug}>
            <Card className="text-center">
              <CardHeader>
                <CardTitle>{classType.type}</CardTitle>
              </CardHeader>
              <CardContent>{classType.description}</CardContent>
              <CardFooter className="justify-center">
                <Button size={"lg"}>Sign Up</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
