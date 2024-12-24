import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { StaffMember } from "./mock-data"

interface StaffMemberDetailsProps {
  staffMember: StaffMember
}

export function StaffMemberDetails({ staffMember }: StaffMemberDetailsProps) {
  const { toast } = useToast()
  const [permissions, setPermissions] = useState(staffMember.permissions || [])

  const handlePermissionChange = (permissionId: string) => {
    setPermissions(prev => 
      prev.map(p => 
        p.id === permissionId ? { ...p, granted: !p.granted } : p
      )
    )
    toast({
      title: "Permission Updated",
      description: "Staff member permissions have been updated.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{staffMember.name}</h2>
          <p className="text-muted-foreground">{staffMember.email}</p>
        </div>
        <Badge>{staffMember.role}</Badge>
      </div>

      <Tabs defaultValue="cases" className="w-full">
        <TabsList>
          <TabsTrigger value="cases">Assigned Cases</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="cases">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {staffMember.assignedCases?.map(case_ => (
                  <div key={case_.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{case_.title}</p>
                      <p className="text-sm text-muted-foreground">Status: {case_.status}</p>
                    </div>
                    <Button variant="outline" size="sm">View Case</Button>
                  </div>
                ))}
                <Button className="w-full">Assign New Case</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {staffMember.assignedTasks?.map(task => (
                  <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline">{task.priority}</Badge>
                        <Badge variant="outline">{task.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Due: {task.dueDate}</p>
                    </div>
                    <Button variant="outline" size="sm">View Task</Button>
                  </div>
                ))}
                <Button className="w-full">Assign New Task</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>Role & Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {permissions.map(permission => (
                  <div key={permission.id} className="flex items-center justify-between">
                    <Label htmlFor={permission.id}>{permission.name}</Label>
                    <Switch
                      id={permission.id}
                      checked={permission.granted}
                      onCheckedChange={() => handlePermissionChange(permission.id)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}