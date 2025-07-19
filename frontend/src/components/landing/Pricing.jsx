import PricingCard from "./PricingCard";


const Pricing = () => {
    return ( 
        <div className="bg-customGreen pricing-area flex p-10 items-center justify-center pb-16">
            <PricingCard 
                title="Hobby Plan"
                price="0"
                features={[
                  'Limited Projects',
                  'Push Notifications',
                  'Basic Analytics',
                  '',
                ]}
                buttonText="Start Free"
                isPopular={true}
            />

            {/* Dev+ Plan */}
            <div class="border-l border-blue-600 h-96 mx-4"></div>
            <PricingCard
              title="Dev+ Plan"
              price="?"
              features={[
                'Unlimited Projects',
                'Push Notifications',
                'Advanced Analytics',
                'Automatic Ratelimiting',
              ]}
              buttonText="Register Interest"
              isPopular={false} // This is the popular plan
              comingSoon={true}
            />
            
            {/* Team Plan */}
            <PricingCard
              title="Team Plan"
              price="?"
              features={[
                'Unlimited Projects',
                'Push Notifications',
                'Advanced Analytics',
                'Unlimited Team Members',
                'Collaboration Features',
              ]}
              buttonText="Register Interest"
              isPopular={false}
              comingSoon={true}
            />
            </div>
    );
}
    
export default Pricing;
