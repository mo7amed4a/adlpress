import { Search, SlidersHorizontal } from "lucide-react";
import InputWithIcon from "../global/InputIcon";
import React from "react";

export default function SubHeaderInput({ isMobileSidebar = false }: { isMobileSidebar?: boolean }) {
  if (isMobileSidebar) {
    return (
      <div className="w-full flex mt-2">
        <InputWithIcon
          className="bg-white h-11 w-full rounded-full border border-yellow-400 shadow-md px-4"
          startIcon={<Search className="text-gray-500" />}
          endIcon={<SlidersHorizontal className="text-blue-500" />}
        />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-3xl">
        <InputWithIcon
          className="bg-white h-12 rounded-full border-2 border-yellow-400 shadow-lg px-5 text-base"
          startIcon={<Search className="text-gray-500" />}
          endIcon={<SlidersHorizontal className="text-blue-500" />}
        />
      </div>
    </div>
  );
}
