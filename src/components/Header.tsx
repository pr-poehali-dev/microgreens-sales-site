import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
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

interface HeaderProps {
  cart: { product: Product; quantity: number }[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  handleCheckout: () => void;
}

export default function Header({
  cart,
  isCartOpen,
  setIsCartOpen,
  updateQuantity,
  removeFromCart,
  handleCheckout,
}: HeaderProps) {
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
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
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  Оформить заказ
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
