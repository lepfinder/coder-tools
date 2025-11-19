export function Footer() {
    return (
        <footer className="border-t py-6 md:py-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row max-w-screen-2xl mx-auto px-4">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    &copy; {new Date().getFullYear()} Coder Tools. All rights reserved.
                </p>
                <p className="text-center text-sm text-muted-foreground md:text-right">
                    Built for developers, by developers.
                </p>
            </div>
        </footer>
    );
}
