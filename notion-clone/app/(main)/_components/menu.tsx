"use client" ;

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface MenuProps {
    documentId: Id<"documents">;
};

export const Menu = ({
    documentId
}:MenuProps) => {
    const router = useRouter() ;
    const { user } = useUser() ;

    const archive = useMutation(api.documents.archive) ;

    const onArchieve = () => {
        const promise = archive({ id: documentId }) ;

        toast.promise(promise, {
            loading: "Moving to Trash...",
            success: "Note moved to Trash",
            error: "Failed to Archive Note"
        });

        router.push("/documents") ;
    }

    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                className="w-60"
                align="end"
                alignOffset={8} 
                forceMount
            >
                <DropdownMenuItem>
                    <Trash className="h-4 w-4 mr-2"></Trash>
                    Delete 
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="text-xs text-muted-foreground">
                    Last Edited By: {user?.fullName}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}