import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AccountSelect() {
  return (
    <Select>
      <SelectTrigger className="w-[100px] h-[32px]">
        <SelectValue placeholder="Account name" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Account</SelectLabel>
          <SelectItem value="Account settings">Account settings</SelectItem>
          <SelectItem value="log out">Log out</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
