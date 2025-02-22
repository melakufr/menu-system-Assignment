"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart2,
  ChevronDown,
  ChevronRight,
  Code2,
  Grid,
  LayoutGrid,
  List,
  Menu,
  Settings,
  Users,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface NavigationItem {
  name: string
  icon: React.ComponentType<{ className?: string }>
  href?: string
  children?: NavigationItem[]
}

const navigation: NavigationItem[] = [
  {
    name: "Systems",
    icon: LayoutGrid,
    children: [
      {
        name: "System Code",
        icon: Code2,
        href: "/systems/system-code",
      },
      {
        name: "Properties",
        icon: Settings,
        href: "/systems/properties",
      },
      {
        name: "Menus",
        icon: Grid,
        href: "/systems/menus",
      },
      {
        name: "API List",
        icon: List,
        href: "/systems/api-list",
      },
    ],
  },
  {
    name: "Users & Group",
    icon: Users,
    href: "/users-and-group",
  },
  {
    name: "Competition",
    icon: BarChart2,
    href: "/competition",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  // Initialize expanded state based on current path
  useEffect(() => {
    const currentPath = pathname
    const shouldExpand = navigation.find((item) => item.children?.some((child) => child.href === currentPath))
    if (shouldExpand) {
      setExpandedItems([shouldExpand.name])
    }
  }, [pathname]) // Removed navigation from dependencies

  const toggleExpand = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName) ? prev.filter((name) => name !== itemName) : [...prev, itemName],
    )
  }

  const isExpanded = (itemName: string) => expandedItems.includes(itemName)

  const isActive = (href?: string) => {
    if (!href) return false
    return pathname === href
  }

  const NavItem = ({ item, depth = 0 }: { item: NavigationItem; depth?: number }) => {
    const hasChildren = !!item.children?.length
    const active = isActive(item.href) || item.children?.some((child) => isActive(child.href))

    return (
      <>
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
            (active && !hasChildren) ? "bg-[#BBFF45] text-black" : "text-gray-400 hover:bg-gray-800 hover:text-white",
            depth > 0 && "ml-4",
          )}
        >
          {hasChildren ? (
            <button onClick={() => toggleExpand(item.name)} className="flex flex-1 items-center gap-3">
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
              {isExpanded(item.name) ? (
                <ChevronDown className="ml-auto h-4 w-4" />
              ) : (
                <ChevronRight className="ml-auto h-4 w-4" />
              )}
            </button>
          ) : (
            <Link href={item.href || "#"} className="flex flex-1 items-center gap-3">
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )}
        </div>
        {hasChildren && isExpanded(item.name) && (
          <div className="space-y-1">
            {item.children?.map((child) => (
              <NavItem key={child.name} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </>
    )
  }

  const SidebarContent = () => (
    <nav className="space-y-1 px-2 py-4">
      {navigation.map((item) => (
        <NavItem key={item.name} item={item} />
      ))}
    </nav>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden w-60 bg-[#14161F] text-white md:block">
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/" className="text-lg font-semibold">
            CLOIT
          </Link>
          <Button variant="ghost" size="icon" className="text-white">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-60 bg-[#14161F] p-0">
            <div className="flex h-14 items-center justify-between px-4">
              <Link href="/" className="text-lg font-semibold text-white" onClick={() => setIsMobileOpen(false)}>
                CLOIT
              </Link>
              <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsMobileOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

