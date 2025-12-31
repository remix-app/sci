import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { useTranslation } from "react-i18next";

export default function Visits() {
  const { t } = useTranslation();
  const { data: visits, isLoading } = trpc.services.getVisits.useQuery();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled": return <Badge variant="outline">{t("scheduled", "Programada")}</Badge>;
      case "completed": return <Badge variant="success">{t("completed", "Completada")}</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">{t("visits", "Registro de Visitas")}</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>{t("recent_visits", "Visitas Recientes")}</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 w-full bg-muted animate-pulse rounded" />
                ))}
              </div>
            ) : visits && (visits as any[]).length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("visitor", "Visitante")}</TableHead>
                    <TableHead>{t("date", "Fecha")}</TableHead>
                    <TableHead>{t("status", "Estado")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(visits as any[]).map((visit) => (
                    <TableRow key={visit.id}>
                      <TableCell className="font-medium">{visit.name}</TableCell>
                      <TableCell>{visit.date}</TableCell>
                      <TableCell>{getStatusBadge(visit.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="py-10 text-center text-muted-foreground">
                {t("no_visits", "No hay registros de visitas.")}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
