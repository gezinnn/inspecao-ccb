import { User2Icon, Home, Settings, Church, Calendar } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Igrejas",
    url: "/igrejas",
    icon: Church,
  },
  {
    title: "Voluntários",
    url: "/voluntarios",
    icon: User2Icon,
  },
  {
    title: "Configurações",
    url: "#",
    icon: Settings,
  },
  {
    title:"Calendário",
    url: "#",
    icon: Calendar,
  }
]

export function AppSidebar() {
  return (
    <Sidebar className="h-screen w-64">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>CCB INSPEÇÃO</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}