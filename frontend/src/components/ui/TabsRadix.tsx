import * as TabsPrimitive from "@radix-ui/react-tabs";
import React from "react";

interface TabInfo {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
}

interface TabsRadixProps {
  tabs: TabInfo[];
  defaultValue: string;
  dir?: "ltr" | "rtl";
  className?: string;
  listClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

export default function TabsRadix({
  tabs,
  defaultValue,
  dir,
  className = "",
  listClassName = "",
  triggerClassName = "",
  contentClassName = "",
}: TabsRadixProps) {
  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue}
      className={`w-full ${className}`}
      dir={dir}
    >
      <TabsPrimitive.List
        className={`flex border-b border-gray-200 ${listClassName}`}
        aria-label="Manage your template sections"
      >
        {tabs.map((tab) => (
          <TabsPrimitive.Trigger
            key={tab.value}
            value={tab.value}
            className={`px-4 py-3 font-medium text-sm text-gray-500 hover:text-gray-700 data-[state=active]:text-purple-600 data-[state=active]:border-b-2 data-[state=active]:border-purple-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 ${triggerClassName}`}
          >
            {tab.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {tabs.map((tab) => (
        <TabsPrimitive.Content
          key={tab.value}
          value={tab.value}
          className={`p-6 ${contentClassName}`}
        >
          {tab.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}
