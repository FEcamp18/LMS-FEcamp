import React from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ScoreProps {
  score: {
    maths: string;
    physics: string;
    chemistry: string;
    tpat3: string;
  };
  mean: {
    maths: string;
    physics: string;
    chemistry: string;
    tpat3: string;
  };
}

const ScoreTable: React.FC<ScoreProps> = ({ score, mean }) => {
  return (
    <div className="w-full content-center overflow-x-auto px-6">
      <div className="relative z-10 mx-auto h-[200px] w-[840px] content-center shadow-md">
        <Table className="pointer-events-none z-30 mx-auto w-auto border-collapse border-spacing-y-2 bg-opacity-80 text-center">
          <TableHeader>
            <TableRow className="border-b border-black">
              <TableHead className="px-8 text-center text-lg font-semibold text-brown">
                Subject
              </TableHead>
              <TableHead className="px-8 text-center text-lg font-semibold text-brown">
                Maths
              </TableHead>
              <TableHead className="px-8 text-center text-lg font-semibold text-brown">
                Physics
              </TableHead>
              <TableHead className="px-8 text-center text-lg font-semibold text-brown">
                Chemistry
              </TableHead>
              <TableHead className="px-8 text-center text-lg font-semibold text-brown">
                TPAT3
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-b border-black">
            <TableRow className="border-b border-black">
              <TableCell className="py-4 font-medium text-dark-brown">
                Scores
              </TableCell>
              <TableCell className="text-dark-brown">{score.maths}</TableCell>
              <TableCell className="text-dark-brown">{score.physics}</TableCell>
              <TableCell className="text-dark-brown">
                {score.chemistry}
              </TableCell>
              <TableCell className="text-dark-brown">{score.tpat3}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-4 font-medium text-dark-brown">
                Mean
              </TableCell>
              <TableCell className="text-dark-brown">{mean.maths}</TableCell>
              <TableCell className="text-dark-brown">{mean.physics}</TableCell>
              <TableCell className="text-dark-brown">
                {mean.chemistry}
              </TableCell>
              <TableCell className="text-dark-brown">{mean.tpat3}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Image
          src="/image/account/score.webp"
          alt="background"
          layout="fill"
          objectFit="cover"
          className="-z-10"
        />
      </div>
    </div>
  );
};

export default ScoreTable;
