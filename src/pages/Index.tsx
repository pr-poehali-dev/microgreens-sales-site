import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  image: string;
  description: string;
  availability: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Микрозелень редиса',
    category: 'microgreens',
    price: 450,
    unit: '100г',
    image: 'https://cdn.poehali.dev/projects/7333f730-5ff7-4620-8135-22d17be76692/files/1b0b72f3-f92f-4cd3-aafb-ac2afab75fda.jpg',
    description: 'Острая, сочная микрозелень с ярким вкусом',
    availability: true,
  },
  {
    id: 2,
    name: 'Микрозелень гороха',
    category: 'microgreens',
    price: 380,
    unit: '100г',
    image: 'https://cdn.poehali.dev/projects/7333f730-5ff7-4620-8135-22d17be76692/files/e9d749ef-0a73-4e1a-876b-1e7299531ded.jpg',
    description: 'Нежная зелень с легким сладковатым привкусом',
    availability: true,
  },
  {
    id: 3,
    name: 'Микрозелень подсолнечника',
    category: 'microgreens',
    price: 420,
    unit: '100г',
    image: 'https://cdn.poehali.dev/projects/7333f730-5ff7-4620-8135-22d17be76692/files/e9d749ef-0a73-4e1a-876b-1e7299531ded.jpg',
    description: 'Хрустящая зелень с ореховым вкусом',
    availability: true,
  },
  {
    id: 4,
    name: 'Букет пищевых цветов Премиум',
    category: 'flowers',
    price: 850,
    unit: 'букет',
    image: 'https://cdn.poehali.dev/projects/7333f730-5ff7-4620-8135-22d17be76692/files/72cf0352-7eb2-44aa-931b-2e2e896f5d31.jpg',
    description: 'Микс из виолы, настурции и календулы',
    availability: true,
  },
  {
    id: 5,
    name: 'Пищевые цветы Виола',
    category: 'flowers',
    price: 600,
    unit: '50шт',
    image: 'https://cdn.poehali.dev/projects/7333f730-5ff7-4620-8135-22d17be76692/files/72cf0352-7eb2-44aa-931b-2e2e896f5d31.jpg',
    description: 'Нежные фиолетовые цветы для декора блюд',
    availability: true,
  },
  {
    id: 6,
    name: 'Микрозелень руколы',
    category: 'microgreens',
    price: 490,
    unit: '100г',
    image: 'https://cdn.poehali.dev/projects/7333f730-5ff7-4620-8135-22d17be76692/files/1b0b72f3-f92f-4cd3-aafb-ac2afab75fda.jpg',
    description: 'Пикантная зелень с горчичными нотками',
    availability: true,
  },
];

const reviews = [
  {
    id: 1,
    restaurant: 'Ресторан "Белый Кролик"',
    author: 'Владимир Мухин, шеф-повар',
    text: 'Отличное качество микрозелени! Всегда свежая, яркая, с насыщенным вкусом. Наши гости в восторге от презентации блюд.',
    rating: 5,
  },
  {
    id: 2,
    restaurant: 'Кафе "Зелёная Веранда"',
    author: 'Анна Петрова, владелица',
    text: 'Сотрудничаем уже полгода. Доставка всегда вовремя, цены адекватные, качество на высоте. Рекомендуем!',
    rating: 5,
  },
  {
    id: 3,
    restaurant: 'Бистро "Свежесть"',
    author: 'Игорь Смирнов, су-шеф',
    text: 'Пищевые цветы просто великолепны! Добавляют изюминку в наши салаты и десерты. Клиенты часто спрашивают, где мы берем такую красоту.',
    rating: 5,
  },
];

export default function Index() {
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.product.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(
        cart.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Leaf" className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">GreenFresh</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#catalog" className="text-sm font-medium hover:text-primary transition-colors">
              Каталог
            </a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              О продукции
            </a>
            <a href="#delivery" className="text-sm font-medium hover:text-primary transition-colors">
              Доставка
            </a>
            <a href="#reviews" className="text-sm font-medium hover:text-primary transition-colors">
              Отзывы
            </a>
            <a href="#contacts" className="text-sm font-medium hover:text-primary transition-colors">
              Контакты
            </a>
          </nav>
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingCart" className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
                <SheetDescription>
                  {cartCount === 0 ? 'Ваша корзина пуста' : `Товаров в корзине: ${cartCount}`}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-4 border-b pb-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-16 w-16 rounded object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.product.price} ₽ × {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Icon name="Minus" className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Icon name="Plus" className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <Icon name="Trash2" className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
              {cartCount > 0 && (
                <div className="mt-8 space-y-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Итого:</span>
                    <span>{cartTotal} ₽</span>
                  </div>
                  <Button className="w-full" size="lg">
                    Оформить заказ
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </header>

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
                src="https://cdn.poehali.dev/projects/7333f730-5ff7-4620-8135-22d17be76692/files/1b0b72f3-f92f-4cd3-aafb-ac2afab75fda.jpg"
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

      <section id="catalog" className="py-20 px-4 bg-white">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="w-fit mx-auto">Каталог</Badge>
            <h2 className="text-4xl font-bold">Наша продукция</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Широкий ассортимент микрозелени и пищевых цветов для ресторанного бизнеса
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="all">Всё</TabsTrigger>
              <TabsTrigger value="microgreens">Микрозелень</TabsTrigger>
              <TabsTrigger value="flowers">Цветы</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover-scale">
                    <div className="relative h-64">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      {product.availability && (
                        <Badge className="absolute top-4 right-4 bg-green-500">В наличии</Badge>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-primary">
                            {product.price} ₽
                          </div>
                          <div className="text-sm text-muted-foreground">{product.unit}</div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" onClick={() => addToCart(product)}>
                        <Icon name="ShoppingCart" className="mr-2 h-4 w-4" />
                        В корзину
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="microgreens" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products
                  .filter((p) => p.category === 'microgreens')
                  .map((product) => (
                    <Card key={product.id} className="overflow-hidden hover-scale">
                      <div className="relative h-64">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        {product.availability && (
                          <Badge className="absolute top-4 right-4 bg-green-500">В наличии</Badge>
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle>{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold text-primary">
                              {product.price} ₽
                            </div>
                            <div className="text-sm text-muted-foreground">{product.unit}</div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" onClick={() => addToCart(product)}>
                          <Icon name="ShoppingCart" className="mr-2 h-4 w-4" />
                          В корзину
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="flowers" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products
                  .filter((p) => p.category === 'flowers')
                  .map((product) => (
                    <Card key={product.id} className="overflow-hidden hover-scale">
                      <div className="relative h-64">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        {product.availability && (
                          <Badge className="absolute top-4 right-4 bg-green-500">В наличии</Badge>
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle>{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold text-primary">
                              {product.price} ₽
                            </div>
                            <div className="text-sm text-muted-foreground">{product.unit}</div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" onClick={() => addToCart(product)}>
                          <Icon name="ShoppingCart" className="mr-2 h-4 w-4" />
                          В корзину
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="about" className="py-20 px-4">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <img
              src="https://cdn.poehali.dev/projects/7333f730-5ff7-4620-8135-22d17be76692/files/e9d749ef-0a73-4e1a-876b-1e7299531ded.jpg"
              alt="Наша продукция"
              className="rounded-2xl shadow-xl hover-scale"
            />
            <div className="space-y-6">
              <Badge variant="outline" className="w-fit">О продукции</Badge>
              <h2 className="text-4xl font-bold">Почему выбирают нас</h2>
              <p className="text-muted-foreground">
                Мы специализируемся на выращивании премиальной микрозелени и пищевых цветов для
                ресторанного бизнеса. Наша продукция выращивается по технологии гидропоники без
                использования пестицидов и химикатов.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="Leaf" className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">100% органическое выращивание</h3>
                    <p className="text-sm text-muted-foreground">
                      Без пестицидов, химикатов и ГМО. Только натуральные удобрения.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Icon name="Truck" className="h-6 w-6 text-secondary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Доставка за 2 часа</h3>
                    <p className="text-sm text-muted-foreground">
                      Собственная логистика обеспечивает быструю доставку по Москве.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Icon name="Award" className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Стабильное качество</h3>
                    <p className="text-sm text-muted-foreground">
                      Контроль качества на всех этапах производства и упаковки.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-20 px-4 bg-white">
        <div className="container max-w-4xl">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="w-fit mx-auto">Доставка</Badge>
            <h2 className="text-4xl font-bold">Условия доставки</h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-3">
                  <Icon name="MapPin" className="h-5 w-5 text-primary" />
                  Зоны доставки
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Мы осуществляем доставку по всей Москве и области. Доставка в пределах МКАД —
                  бесплатно при заказе от 3000 ₽. За МКАД стоимость рассчитывается индивидуально.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-3">
                  <Icon name="Clock" className="h-5 w-5 text-primary" />
                  Время доставки
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Стандартная доставка: 2-4 часа с момента оформления заказа. Срочная доставка за 2
                  часа доступна с наценкой 15%. График работы: ежедневно с 8:00 до 22:00.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-3">
                  <Icon name="Package" className="h-5 w-5 text-primary" />
                  Упаковка и хранение
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Продукция доставляется в специальных контейнерах с контролем температуры. После
                  получения рекомендуется хранить при температуре +2...+4°C. Срок хранения
                  микрозелени — 5-7 дней, пищевых цветов — 3-5 дней.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-3">
                  <Icon name="CreditCard" className="h-5 w-5 text-primary" />
                  Условия оплаты
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Принимаем оплату: наличными курьеру, банковской картой, безналичный расчёт по
                  счёту. Для постоянных клиентов доступна отсрочка платежа. НДС включён в
                  стоимость.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="w-fit mx-auto">Отзывы</Badge>
            <h2 className="text-4xl font-bold">Что говорят наши клиенты</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <Card key={review.id} className="hover-scale">
                <CardHeader>
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Icon key={i} name="Star" className="h-5 w-5 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{review.restaurant}</CardTitle>
                  <CardDescription>{review.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4 bg-white">
        <div className="container max-w-4xl">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="w-fit mx-auto">Контакты</Badge>
            <h2 className="text-4xl font-bold">Свяжитесь с нами</h2>
            <p className="text-muted-foreground">
              Готовы ответить на любые вопросы и оформить заказ
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Phone" className="h-5 w-5 text-primary" />
                  Телефон
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">+7 (495) 123-45-67</p>
                <p className="text-sm text-muted-foreground mt-1">Ежедневно с 8:00 до 22:00</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Mail" className="h-5 w-5 text-primary" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">info@greenfresh.ru</p>
                <p className="text-sm text-muted-foreground mt-1">Ответим в течение часа</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="MapPin" className="h-5 w-5 text-primary" />
                  Адрес
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">Москва, ул. Садовая, д. 15</p>
                <p className="text-sm text-muted-foreground mt-1">Возможен самовывоз</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="MessageCircle" className="h-5 w-5 text-primary" />
                  Мессенджеры
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">WhatsApp / Telegram</p>
                <p className="text-sm text-muted-foreground mt-1">Быстрая связь 24/7</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t py-12 px-4">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Leaf" className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-primary">GreenFresh</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Премиальная микрозелень и пищевые цветы для ресторанного бизнеса
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Навигация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#catalog" className="hover:text-primary transition-colors">
                    Каталог
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-primary transition-colors">
                    О продукции
                  </a>
                </li>
                <li>
                  <a href="#delivery" className="hover:text-primary transition-colors">
                    Доставка
                  </a>
                </li>
                <li>
                  <a href="#reviews" className="hover:text-primary transition-colors">
                    Отзывы
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>+7 (495) 123-45-67</li>
                <li>info@greenfresh.ru</li>
                <li>Москва, ул. Садовая, 15</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Режим работы</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Ежедневно</li>
                <li>8:00 — 22:00</li>
                <li className="mt-4 pt-4 border-t">
                  <span className="text-primary font-medium">Доставка за 2 часа</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2024 GreenFresh. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
