import PackageCard from './PackageCard';

const packages = [
  {
    title: 'Professional Website',
    price: '350',
    highlight: false,
    features: [
      'Custom Homepage + Services + About Page',
      'Customer Login & Portal',
      'Admin Back Office',
      'Responsive Design',
      'SEO Optimized & Fast',
      'Launched to Your Domain'
    ]
  },
  {
    title: 'E-Commerce Site',
    price: '450',
    highlight: true,
    features: [
      'Everything in the $350 Package',
      'Product Listings (Manual or API)',
      'Shopping Cart + Checkout Flow',
      'Payment Gateway Integration',
      'Inventory Admin Tools',
      'Scalable & Secure for Sales'
    ]
  }
];

export default function CorePackages() {
  return (
    <section className="bg-[#121212] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Flat-Rate Website Packages</h2>
        <p className="text-gray-400">Elite builds for honest prices. No subscriptions. No templates. Just results.</p>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-10 items-stretch">
        {packages.map((pkg, idx) => (
          <PackageCard key={idx} {...pkg} />
        ))}
      </div>
    </section>
  );
}