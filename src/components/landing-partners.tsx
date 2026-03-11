"use client"

export const Partners = () => (
  <section className="py-12 border-b bg-muted/10">
    <div className="container">
      <p className="text-center text-xs md:text-sm font-semibold text-muted-foreground mb-8 tracking-[0.2em]">
        OFFICIAL PARTNERS
      </p>
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
        <div className="text-xl md:text-2xl font-bold text-muted-foreground hover:text-foreground transition-colors cursor-default">
          Google Cloud
        </div>
        <div className="text-xl md:text-2xl font-bold text-muted-foreground hover:text-foreground transition-colors cursor-default">
          AWS
        </div>
        <div className="text-xl md:text-2xl font-bold text-muted-foreground hover:text-foreground transition-colors cursor-default">
          flip
        </div>
      </div>
    </div>
  </section>
)
