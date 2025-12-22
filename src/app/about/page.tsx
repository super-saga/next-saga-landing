"use client"

import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Lightbulb, TrendingUp, ShieldCheck, Users, ArrowRight, Target, Heart, Search } from "lucide-react"

export default function AboutPage() {
  const milestones = [
    {
      year: "Awal Mula",
      title: "Pengalaman sebagai Pengurus",
      description: "Berawal dari pengalaman pribadi menjadi pengurus komunitas. Mengelola iuran dan data warga secara manual ternyata sangat melelahkan dan rentan kesalahan.",
      icon: Users
    },
    {
      year: "Masalah Utama",
      title: "Krisis Transparansi",
      description: "Kami menemukan fakta mengejutkan: Hanya 36% warga yang sadar akan pentingnya konfirmasi digital. Hal ini menyebabkan ketidakcocokan data dan rasa saling curiga antar warga.",
      icon: Search
    },
    {
      year: "Solusi Lahir",
      title: "Saga & Sahabat Warga",
      description: "Kami mendirikan Saga dengan misi membantu bisnis dan komunitas bertransformasi digital. Sahabat Warga lahir sebagai solusi transparansi keuangan lingkungan.",
      icon: Lightbulb
    },
    {
      year: "Masa Depan",
      title: "Pertumbuhan Bersama",
      description: "Kini Saga fokus membantu masyarakat dan bisnis untuk tumbuh (growth) melalui adaptasi teknologi yang tepat guna dan mudah digunakan.",
      icon: TrendingUp
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-muted/30 overflow-hidden relative">
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto space-y-6"
          >
            <Badge variant="outline" className="px-4 py-1 text-primary border-primary">Tentang Kami</Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Dari Pengalaman Nyata, <br/>
              <span className="text-primary">Untuk Solusi Nyata</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Saga hadir bukan sekadar sebagai pembuat aplikasi, tapi sebagai partner transformasi digital untuk komunitas dan bisnis Anda.
            </p>
          </motion.div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />
      </section>

      {/* Story / Timeline Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Perjalanan Kami</h2>
            <p className="text-muted-foreground text-lg">Bagaimana sebuah masalah kecil melahirkan solusi besar.</p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block" />
            
            <div className="space-y-12">
              {milestones.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`flex flex-col md:flex-row gap-8 items-start relative ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Icon on Timeline */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 bg-background border-2 border-primary rounded-full z-10 hidden md:flex items-center justify-center">
                    <div className="w-3 h-3 bg-primary rounded-full" />
                  </div>

                  <div className="flex-1 w-full md:w-1/2">
                    <Card className={`h-full hover:shadow-lg transition-all ${
                      index % 2 === 0 ? "md:text-left" : "md:text-right"
                    }`}>
                      <CardHeader>
                        <div className={`flex items-center gap-3 mb-2 ${
                          index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                        }`}>
                          <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <item.icon className="w-5 h-5" />
                          </div>
                          <Badge variant="secondary">{item.year}</Badge>
                        </div>
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
           <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="flex-1 relative"
             >
               <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl overflow-hidden shadow-xl relative group">
                  {/* Placeholder for Profile Image */}
                  <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <Users className="w-24 h-24 text-muted-foreground/30" />
                  </div>
                  
                  {/* Decorative frame */}
                  <div className="absolute inset-0 border-[10px] border-background/30 rounded-2xl z-10" />
               </div>
               <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl -z-10" />
               <div className="absolute -top-6 -left-6 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl -z-10" />
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="flex-1 space-y-6"
             >
               <Badge className="bg-primary text-primary-foreground">Founder Profile</Badge>
               <h2 className="text-3xl md:text-4xl font-bold">Dede Kurnihawan</h2>
               <p className="text-lg font-medium text-primary">Founder & CEO Saga</p>
               
               <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground text-lg">
                 "Permasalahan terbesar dalam pengelolaan komunitas bukan pada uangnya, tapi pada <span className="text-foreground font-semibold">kepercayaan</span>. Transparansi adalah kunci untuk membangun kepercayaan tersebut."
               </blockquote>

               <div className="space-y-4 pt-4">
                 <p className="text-muted-foreground leading-relaxed">
                   Berpengalaman langsung sebagai pengurus lingkungan, Dede merasakan betapa sulitnya menjaga akuntabilitas dengan metode manual. Ia menemukan bahwa hanya 36% warga yang sadar akan pentingnya konfirmasi digital, menciptakan celah transparansi yang besar.
                 </p>
                 <p className="text-muted-foreground leading-relaxed">
                   Melalui Saga, Dede bertekad membantu bisnis dan komunitas untuk tidak hanya mendigitalkan proses, tetapi juga <span className="font-semibold text-foreground">bertumbuh (growth)</span> melalui adaptasi teknologi yang manusiawi.
                 </p>
               </div>

               <div className="pt-6">
                 <Button asChild>
                   <Link href="https://linkedin.com/in/dedekurnihawan" target="_blank">
                     Lihat Profil Profesional <ArrowRight className="ml-2 w-4 h-4" />
                   </Link>
                 </Button>
               </div>
             </motion.div>
           </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-background">
        <div className="container text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Nilai-Nilai Kami</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-primary/5 border-none shadow-none">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-primary">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Transparansi</h3>
                <p className="text-sm text-muted-foreground">Keterbukaan adalah fondasi dari setiap solusi yang kami bangun.</p>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-none shadow-none">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-primary">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Pertumbuhan</h3>
                <p className="text-sm text-muted-foreground">Kami membantu partner kami untuk tumbuh, bukan sekadar bertahan.</p>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-none shadow-none">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-primary">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Empati</h3>
                <p className="text-sm text-muted-foreground">Solusi kami lahir dari pemahaman mendalam akan masalah pengguna.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <div className="container">
          <h2 className="text-3xl font-bold mb-6">Siap Bertransformasi Bersama Saga?</h2>
          <div className="flex justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/">Pelajari Produk Kami</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
