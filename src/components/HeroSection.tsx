import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export default function HeroSection() {
  return (
    <section className="py-20 px-4">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <Badge className="w-fit">Премиальная продукция для ресторанов</Badge>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Свежая микрозелень и пищевые цветы
            </h1>
            <p className="text-xl text-muted-foreground">
              Выращиваем и доставляем в рестораны Москвы ежедневно. Высокое качество, стабильные
              поставки, выгодные цены для бизнеса.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}>
                <Icon name="ShoppingBag" className="mr-2 h-5 w-5" />
                Смотреть каталог
              </Button>
              <Button size="lg" variant="outline">
                <Icon name="Phone" className="mr-2 h-5 w-5" />
                Связаться с нами
              </Button>
            </div>
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Ресторанов-партнёров</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">2 часа</div>
                <div className="text-sm text-muted-foreground">Доставка по Москве</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Свежесть продукции</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://cdn.poehali.dev/projects/7333f730-5ff7-4620-8135-22d17be76692/files/65bd4174-8fb9-4367-bcb2-30108505f33c.jpg"
              alt="Свежая микрозелень"
              className="rounded-2xl shadow-2xl hover-scale"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-3">
                <Icon name="Award" className="h-8 w-8 text-secondary" />
                <div>
                  <div className="font-bold">Премиум качество</div>
                  <div className="text-sm text-muted-foreground">Сертифицированная продукция</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
