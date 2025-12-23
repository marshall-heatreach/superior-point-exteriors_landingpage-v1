import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Wrench, Droplets } from 'lucide-react';

// Form schema with zod validation
const formSchema = z.object({
  serviceType: z.enum(['roofing', 'siding', 'gutters'], {
    required_error: 'Please select a service type',
  }),
  streetAddress: z.string().min(5, 'Please enter a valid street address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
});

type FormData = z.infer<typeof formSchema>;

const serviceOptions = [
  {
    id: 'roofing' as const,
    label: 'Roofing',
    icon: Home,
    description: 'Professional roofing services',
  },
  {
    id: 'siding' as const,
    label: 'Siding',
    icon: Wrench,
    description: 'Expert siding installation',
  },
  {
    id: 'gutters' as const,
    label: 'Gutters',
    icon: Droplets,
    description: 'Gutter repair & installation',
  },
];

export default function EstimateForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const serviceType = watch('serviceType');

  const handleServiceSelect = (serviceId: 'roofing' | 'siding' | 'gutters') => {
    setValue('serviceType', serviceId, { shouldValidate: true });
    // Auto-advance to next step
    setDirection(1);
    setTimeout(() => {
      setCurrentStep(2);
    }, 300);
  };

  const onSubmit = async (data: FormData) => {
    // TODO: Replace with actual form submission logic
    console.log('Form submitted:', data);
    // You can add your form submission logic here
    // e.g., send to API endpoint
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  // Animation variants for slide transitions
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const transition = {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.3,
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of 3
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round((currentStep / 3) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-[#65b357] h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / 3) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form steps with animations */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait" custom={direction}>
            {/* Step 1: Service Type */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
                className="absolute inset-0"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
                  What service do you need?
                </h2>
                <p className="text-gray-600 mb-8 text-center">
                  Select the service you're interested in
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {serviceOptions.map((service) => {
                    const Icon = service.icon;
                    const isSelected = serviceType === service.id;
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => handleServiceSelect(service.id)}
                        className={`
                          relative p-6 rounded-lg border-2 transition-all duration-200
                          ${isSelected
                            ? 'border-[#65b357] bg-[#65b357]/5 shadow-md'
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                          }
                        `}
                      >
                        <div className="flex flex-col items-center text-center">
                          <div
                            className={`
                              p-4 rounded-full mb-4 transition-colors
                              ${isSelected ? 'bg-[#65b357]' : 'bg-gray-100'}
                            `}
                          >
                            <Icon
                              className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-gray-600'}`}
                            />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {service.label}
                          </h3>
                          <p className="text-sm text-gray-500">{service.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {errors.serviceType && (
                  <p className="mt-4 text-sm text-red-600 text-center">
                    {errors.serviceType.message}
                  </p>
                )}
              </motion.div>
            )}

            {/* Step 2: Location */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
                className="absolute inset-0"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
                  Where are you located?
                </h2>
                <p className="text-gray-600 mb-8 text-center">
                  Enter your street address
                </p>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="streetAddress"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Street Address
                    </label>
                    <input
                      id="streetAddress"
                      type="text"
                      {...register('streetAddress')}
                      className={`
                        w-full px-4 py-3 text-base border-2 rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-[#65b357] focus:border-transparent
                        ${errors.streetAddress ? 'border-red-500' : 'border-gray-300'}
                      `}
                      placeholder="123 Main Street"
                      style={{ fontSize: '16px' }} // Prevent zoom on iOS
                    />
                    {errors.streetAddress && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.streetAddress.message}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 px-6 py-3 text-base font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex-1 px-6 py-3 text-base font-medium text-white bg-[#65b357] rounded-lg hover:bg-[#5aa04a] transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Contact Information */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
                className="absolute inset-0"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
                  How can we reach you?
                </h2>
                <p className="text-gray-600 mb-8 text-center">
                  We'll use this to contact you about your estimate
                </p>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register('name')}
                      className={`
                        w-full px-4 py-3 text-base border-2 rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-[#65b357] focus:border-transparent
                        ${errors.name ? 'border-red-500' : 'border-gray-300'}
                      `}
                      placeholder="John Doe"
                      style={{ fontSize: '16px' }}
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      className={`
                        w-full px-4 py-3 text-base border-2 rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-[#65b357] focus:border-transparent
                        ${errors.phone ? 'border-red-500' : 'border-gray-300'}
                      `}
                      placeholder="(555) 123-4567"
                      style={{ fontSize: '16px' }}
                    />
                    {errors.phone && (
                      <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      className={`
                        w-full px-4 py-3 text-base border-2 rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-[#65b357] focus:border-transparent
                        ${errors.email ? 'border-red-500' : 'border-gray-300'}
                      `}
                      placeholder="john@example.com"
                      style={{ fontSize: '16px' }}
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 px-6 py-3 text-base font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 text-base font-medium text-white bg-[#65b357] rounded-lg hover:bg-[#5aa04a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : 'Get Free Estimate'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
}

