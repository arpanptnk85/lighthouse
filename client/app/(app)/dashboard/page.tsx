import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/20 via-background to-secondary/30 border border-primary/10 shadow-lg shadow-primary/5" />
            <div className="aspect-video rounded-xl bg-gradient-to-br from-secondary/30 via-background to-primary/20 border border-primary/10 shadow-lg shadow-primary/5" />
            <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/20 via-background to-secondary/30 border border-primary/10 shadow-lg shadow-primary/5" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min bg-gradient-to-b from-secondary/50 to-background border border-primary/10 shadow-xl shadow-primary/5" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
