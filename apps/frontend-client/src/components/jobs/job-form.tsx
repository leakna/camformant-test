import React from 'react';
import BasicInfo from './sections/BasicInfo';
import JobDetails from './sections/JobDetails';
import DateSection from './sections/DateSection';
import SalarySection from './sections/SalarySection';
import DescriptionSection from './sections/DescriptionSection';
import LocationSection from './sections/LocationSection';
import { Button } from '@/components/ui/button';
import { Jobs } from '@/utils/types/form-type';
import { useJobForm } from '@/hooks/useJobForm';
import JobFormSkeleton from './JobFormSkeleton';

interface JobFormProps {
  formTitle: string;
  existingData?: Jobs;
  typeOfForm?: "POST" | "PUT";
}

const JobForm: React.FC<JobFormProps> = ({ formTitle, existingData, typeOfForm = "POST" }) => {
  const { 
    formData, 
    errors, isLoading,
    handleSubmit, 
    handleChange, 
    handleArrayChange, 
    handleChangeNum,
    handleDateChange,
    setFormData 
  } = useJobForm({
    existingData,
    typeOfForm
  });

  return (
      <>
      {
        isLoading ? (
          <JobFormSkeleton/>
        ) : (
          <div className="flex min-h-screen">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold tracking-tight">{formTitle}</h2>
                <p className="text-gray-500">Fill in the details for the job posting</p>
              </div>
    
              <div className="space-y-8">
                <BasicInfo 
                  formData={formData}
                  errors={errors}
                  handleChange={handleChange}
                />
    
                <JobDetails 
                  formData={formData}
                  errors={errors}
                  handleArrayChange={handleArrayChange}
                  handleChangeNum={handleChangeNum}
                />
    
                <DateSection 
                  formData={formData}
                  errors={errors}
                  handleDateChange={handleDateChange}
                />
    
                <SalarySection 
                  formData={formData}
                  errors={errors}
                  handleChangeNum={handleChangeNum}
                />
    
                <DescriptionSection 
                  formData={formData}
                  errors={errors}
                  handleChange={handleChange}
                />
    
                <LocationSection 
                  formData={formData}
                  setFormData={setFormData}
                />
    
                <Button 
                  type="submit"
                  className="w-full bg-orange-400 hover:bg-orange-500 text-white"
                >
                  {typeOfForm === "POST" ? "Create Job" : "Update Job"}
                </Button>
              </div>
            </div>
          </form>
        </div>
        )
      }
      </>
  );
};

export default JobForm;