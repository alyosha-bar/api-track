import PricingCard from "./PricingCard";


const Pricing = () => {
    return ( 
        <div className="bg-customGreen pricing-area flex p-10 items-center justify-center pb-16">
            <PricingCard 
                title="Hobby Plan (Beta)"
                price="0"
                features={[
                  '10 Projects',
                  'Basic Analytics',
                  'Personal Support',
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
              ]}
              buttonText="Register Interest"
              isPopular={false}
              comingSoon={true}
            />
            
            {/* Team Plan */}
            <PricingCard
              title="Team Plan"
              price="?"
              features={[
                'All Dev+ Options',
                'Collaboration Features',
                'Unlimited Team Members',
              ]}
              buttonText="Register Interest"
              isPopular={false}
              comingSoon={true}
            />
            </div>
    );
}
    
export default Pricing;
