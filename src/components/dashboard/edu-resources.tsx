import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const resources = [
  {
    question: 'What is Bitcoin mining?',
    answer:
      "Bitcoin mining is the process by which new bitcoins are entered into circulation. It is also the critical component of the maintenance and development of the blockchain ledger. It is performed using very sophisticated computers that solve extremely complex computational math problems.",
  },
  {
    question: 'What is a hashrate?',
    answer:
      "The hashrate is a measure of the processing power of the Bitcoin network. To mine bitcoins, computers must perform intensive calculations, known as hashes. The hashrate is the speed at which these calculations are being performed across the entire network or by a single miner.",
  },
  {
    question: 'What is a mining pool?',
    answer:
      'A mining pool is the pooling of resources by miners, who share their processing power over a network, to split the reward equally, according to the amount of work they contributed to the probability of finding a block. This provides a more stable and predictable income stream than solo mining.',
  },
  {
    question: 'What is a block reward?',
    answer:
      "The block reward is the amount of new bitcoin awarded by the network to the miner (or mining pool) that successfully solves the cryptographic puzzle and adds a new block to the blockchain. The reward is halved approximately every four years in an event called the 'halving'.",
  },
];

export function EducationalResources() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="font-headline">Blockchain Knowledge Base</CardTitle>
        <CardDescription>Learn the fundamentals of blockchain technology.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {resources.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent className="text-foreground/80">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
