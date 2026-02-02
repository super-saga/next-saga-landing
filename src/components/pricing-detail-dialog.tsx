"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  HelpCircle 
} from "lucide-react"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Feature {
  name: string
  description: string
  icon: any // Lucide icon component
}

interface Plan {
  name: string
  price: string
  period: string
  billing?: string
  description: string
  features: Feature[]
  cta: string
  href: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

interface PricingDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  plan: Plan | null
  planType: "community" | "enterprise"
}

export function PricingDetailDialog({ 
  open, 
  onOpenChange, 
  plan, 
  planType 
}: PricingDetailDialogProps) {
  if (!plan) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0 duration-500 data-[state=open]:duration-500 data-[state=closed]:duration-300"
        overlayClassName="duration-500 data-[state=open]:duration-500 data-[state=closed]:duration-300"
      >
        {/* Accessible Title */}
        <DialogTitle className="sr-only">
          Detail Paket {plan.name}
        </DialogTitle>

        <div className="flex flex-col md:flex-row min-h-full">
          {/* Left Side: Feature List */}
          <div className="flex-1 p-6 md:p-8 bg-background">
            <div className="mb-6">
              <Badge variant="outline" className="mb-2">{plan.name} Features</Badge>
              <h3 className="text-2xl font-bold mb-2">Kenapa memilih paket ini?</h3>
              <p className="text-muted-foreground">Detail lengkap fitur yang akan Anda dapatkan.</p>
            </div>
            
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="space-y-6"
            >
              {plan.features.map((feature, i) => (
                <motion.div 
                  key={i} 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="flex gap-4 p-4 rounded-xl border bg-card/50 hover:bg-card hover:border-primary/20 transition-colors group"
                >
                  <div className={`p-3 rounded-lg h-fit ${planType === "enterprise" ? "bg-blue-100 text-blue-600" : "bg-emerald-100 text-emerald-600"}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{feature.name}</h4>
                      <CheckCircle2 className={`w-5 h-5 ${planType === "enterprise" ? "text-blue-600" : "text-emerald-500"}`} />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Side: Sticky Card Summary */}
          {/* Removed sticky from parent, added min-h-full to ensure background stretches */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full md:w-[350px] bg-muted/30 border-l flex flex-col"
          >
            <div className="sticky top-0 p-6 md:p-8">
              <div className="mb-6">
                <h4 className="font-bold text-xl mb-2">{plan.name}</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                {plan.billing && (
                    <p className="text-xs text-muted-foreground mt-1">{plan.billing}</p>
                )}
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm">
                  <ShieldCheck className="w-5 h-5 text-muted-foreground" />
                  <span>Jaminan keamanan data</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span>Setup instan & mudah</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <HelpCircle className="w-5 h-5 text-muted-foreground" />
                  <span>Bantuan support tim</span>
                </div>
              </div>

              <Button 
                className={`w-full h-12 text-base ${planType === "enterprise" ? "bg-blue-600 hover:bg-blue-700" : ""}`} 
                variant={plan.variant || "default"}
                asChild
              >
                <Link href={plan.href || "#"}>{plan.cta}</Link>
              </Button>
              
              <p className="text-xs text-center text-muted-foreground mt-4">
                *Syarat dan ketentuan berlaku. <br/>Dapat dibatalkan kapan saja.
              </p>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
