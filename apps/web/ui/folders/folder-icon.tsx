import { FolderAccessLevel, Folder as FolderProps } from "@/lib/types";
import {
  Folder,
  FolderBookmark,
  FolderLock,
  FolderPlus,
  FolderShield,
} from "@dub/ui/icons";
import { cn } from "@dub/utils";

const folderIconsMap: Record<
  FolderAccessLevel | "new" | "unsorted" | "none",
  {
    borderColor: string;
    bgColor: string;
    icon: React.ElementType;
    defaultIconClassName: string;
  }
> = {
  read: {
    borderColor: "border-indigo-200",
    bgColor: "bg-indigo-100",
    icon: FolderShield,
    defaultIconClassName: "text-indigo-800",
  },
  write: {
    borderColor: "border-blue-200",
    bgColor: "bg-blue-100",
    icon: Folder,
    defaultIconClassName: "text-blue-800",
  },
  none: {
    borderColor: "border-orange-200",
    bgColor: "bg-orange-100",
    icon: FolderLock,
    defaultIconClassName: "text-orange-800",
  },
  new: {
    borderColor: "border-neutral-200",
    bgColor: "bg-neutral-100",
    icon: FolderPlus,
    defaultIconClassName: "text-gray-800",
  },
  unsorted: {
    borderColor: "border-green-200",
    bgColor: "bg-green-100",
    icon: FolderBookmark,
    defaultIconClassName: "text-green-800",
  },
} as const;

const determineFolderIcon = (
  folder: Pick<FolderProps, "id" | "accessLevel">,
) => {
  if (["new", "unsorted"].includes(folder.id)) {
    return folder.id;
  }

  if (folder.accessLevel) {
    return folder.accessLevel;
  }

  return "none";
};

export const FolderIcon = ({
  folder,
  shape = "rounded",
  className,
  innerClassName,
  iconClassName,
}: {
  folder?: Pick<FolderProps, "id" | "accessLevel">;
  shape?: "rounded" | "square";
  className?: string;
  innerClassName?: string;
  iconClassName?: string;
}) => {
  const iconType = folder ? determineFolderIcon(folder) : "write";
  const {
    borderColor,
    bgColor,
    icon: Icon,
    defaultIconClassName,
  } = folderIconsMap[iconType];

  return (
    <div
      className={cn(
        "border",
        shape === "rounded" ? "rounded-full bg-white p-0.5" : "rounded-md",
        borderColor,
        shape !== "rounded" && bgColor,
        className,
      )}
    >
      <div
        className={cn(
          shape === "rounded" ? "rounded-full p-2" : "rounded-md p-1",
          bgColor,
          innerClassName,
        )}
      >
        <Icon className={cn("size-4", defaultIconClassName, iconClassName)} />
      </div>
    </div>
  );
};
