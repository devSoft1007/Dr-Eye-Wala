"use client";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";   
import Link from "next/link";

// Define routes array
const adminRoutes = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Categories", href: "/admin/categories" },
  { label: "Appointments", href: "/admin/appointments" },
  { label: "Settings", href: "/admin/settings" },
];

export default function AdminHeader() {
    return (
        <header className="w-full bg-white dark:bg-gray-950 shadow-sm px-4 py-2 flex items-center justify-between sticky top-0 z-50">
            {/* Left: Logo */}
            <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary tracking-tight">DrEyewala Admin</span>
            </div>

            {/* Center: Navigation (hidden on mobile) */}
            <nav className="hidden md:flex gap-6">
                {adminRoutes.map(route => (
                    <Link
                        key={route.href}
                        href={route.href}
                        className="text-sm font-medium hover:text-primary transition-colors"
                    >
                        {route.label}
                    </Link>
                ))}
            </nav>

            {/* Right: Profile & Mobile Menu */}
            <div className="flex items-center gap-2">
                {/* Mobile menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="w-5 h-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        {adminRoutes.map(route => (
                            <DropdownMenuItem asChild key={route.href}>
                                <Link href={route.href}>{route.label}</Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Profile dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src="/admin-avatar.png" alt="Admin" />
                                <AvatarFallback>AD</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem asChild>
                            <Link href="/admin/profile">Profile</Link>
                        </DropdownMenuItem>
                        {adminRoutes.map(route => (
                            <DropdownMenuItem asChild key={route.href}>
                                <Link href={route.href}>{route.label}</Link>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuItem asChild>
                            <Link href="/logout" className="text-red-600">Logout</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}