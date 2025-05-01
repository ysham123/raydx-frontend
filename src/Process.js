import React from 'react';
import { 
  CloudArrowUpIcon, 
  Cog8ToothIcon, 
  AcademicCapIcon, 
  ChartBarIcon, 
  DocumentTextIcon, 
  ComputerDesktopIcon 
} from '@heroicons/react/24/outline';

// Import the MobileNetV2 diagram
import modelTrainingDiagram from './assets/mobilenetv2 image.jpg';

const steps = [
  {
    title: 'Data Collection',
    description: 'Gather 300 labeled X-ray images (150 normal, 150 pneumonia).',
    icon: CloudArrowUpIcon,
  },
  {
    title: 'Preprocessing',
    description: 'Resize images to 224x224, convert to RGB, normalize.',
    icon: Cog8ToothIcon,
  },
  {
    title: 'Model Training',
    description: 'Fine-tune MobileNetV2 on 360 images for 5 epochs.',
    icon: AcademicCapIcon,
  },
  {
    title: 'Prediction',
    description: 'Predict the class with a confidence score using softmax.',
    icon: ChartBarIcon,
  },
  {
    title: 'Report Generation',
    description: 'Generate a radiology report using Grok-3 via xAI API.',
    icon: DocumentTextIcon,
  },
  {
    title: 'User Interface',
    description: 'Display results, store in localStorage, show history.',
    icon: ComputerDesktopIcon,
  },
];

function Process() {
  return (
    <div className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white min-h-screen flex flex-col">
      {/* Upper Half: Step Boxes */}
      <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
        RayDx Machine Learning Workflow
      </h2>
      <div className="max-w-7xl mx-auto flex-1">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white shadow-lg rounded-xl p-8 w-full md:w-64 flex flex-col items-center text-center transition-transform duration-300 hover:shadow-2xl hover:scale-105 animate-fade-in"
            >
              <step.icon className="w-16 h-16 text-blue-600 mb-6" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lower Half: MobileNetV2 Diagram with Enhanced Styling */}
      <div className="max-w-7xl mx-auto mt-12 flex flex-col items-center">
        {/* Caption/Title Above the Diagram */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          MobileNetV2 Architecture for Pneumonia Detection
        </h3>
        {/* Diagram Container with Background, Shadow, and Border */}
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl flex justify-center animate-fade-in">
          <img
            src={modelTrainingDiagram}
            alt="MobileNetV2 Diagram"
            className="max-w-full h-auto rounded-lg border border-gray-200"
          />
        </div>
      </div>
    </div>
  );
}

export default Process;