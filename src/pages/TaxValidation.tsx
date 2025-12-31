import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { useTranslation } from "react-i18next";
import { CheckCircle, AlertCircle, Loader2, Search } from "lucide-react";
import { useState, ChangeEvent } from "react";
import { toast } from "sonner";

export default function TaxValidation() {
  const { t } = useTranslation();
  const [rut, setRut] = useState<string>("");
  const [validationResult, setValidationResult] = useState<any>(null);

  const validateMutation = trpc.integrations.validateTaxId.useMutation({
    onSuccess: (data: any) => {
      setValidationResult(data);
      if (data.isValid) {
        toast.success(t("rut_valid", "RUT válido"));
      } else {
        toast.error(data.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.message);
    }
  });

  const handleValidate = () => {
    if (!rut) {
      toast.error(t("enter_rut", "Por favor ingresa un RUT"));
      return;
    }

    validateMutation.mutate({ taxId: rut });
  };

  const formatRUT = (value: string) => {
    let cleaned = value.replace(/[^\d\-K]/gi, "").toUpperCase();
    if (!cleaned.includes("-") && cleaned.length > 1) {
      cleaned = cleaned.slice(0, -1) + "-" + cleaned.slice(-1);
    }
    return cleaned;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight">{t("tax_validation", "Validación Tributaria")}</h1>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              {t("validate_rut", "Validar RUT")}
            </CardTitle>
            <CardDescription>
              {t("rut_validation_desc", "Verifica la validez de un RUT chileno según el SII")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("rut", "RUT")}</label>
              <Input
                placeholder="12.345.678-9"
                value={rut}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setRut(formatRUT(e.target.value))}
                disabled={validateMutation.isPending}
              />
              <p className="text-xs text-muted-foreground">
                {t("rut_format", "Formato: 12.345.678-9 o 12345678-9")}
              </p>
            </div>

            <Button
              onClick={handleValidate}
              disabled={validateMutation.isPending}
              className="w-full"
            >
              {validateMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              {t("validate", "Validar")}
            </Button>
          </CardContent>
        </Card>

        {validationResult && (
          <Card className={validationResult.isValid ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {validationResult.isValid ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600" />
                )}
                <span className={validationResult.isValid ? "text-green-700" : "text-red-700"}>
                  {validationResult.message}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t("status", "Estado")}</p>
                  <Badge variant={validationResult.isValid ? "success" : "destructive"}>
                    {validationResult.isValid ? t("valid", "Válido") : t("invalid", "Inválido")}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("rut", "RUT")}</p>
                  <p className="font-mono font-semibold">{rut}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
