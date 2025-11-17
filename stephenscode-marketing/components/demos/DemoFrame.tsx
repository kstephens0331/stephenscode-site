'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Demo } from '@/lib/demos-data'
import { demoColorPalettes } from '@/lib/demo-colors'

// Import demo templates - All 40 demos
import BarbershopDemo from './templates/01-barbershop'
import HandymanDemo from './templates/02-handyman'
import PhotographyDemo from './templates/03-photography'
import CleaningDemo from './templates/04-cleaning'
import TutoringDemo from './templates/05-tutoring'
import LandscapingDemo from './templates/06-landscaping'
import DentalDemo from './templates/07-dental'
import AccountingDemo from './templates/08-accounting'
import SalonDemo from './templates/09-salon'
import HvacDemo from './templates/10-hvac'
import LawFirmDemo from './templates/11-law-firm'
import PlumbingDemo from './templates/12-plumbing'
import RealEstateDemo from './templates/13-realestate'
import GymDemo from './templates/14-gym'
import VeterinaryDemo from './templates/15-veterinary'
import BoutiqueDemo from './templates/16-boutique'
import BakeryDemo from './templates/17-bakery'
import SupplementsDemo from './templates/18-supplements'
import JewelryDemo from './templates/19-jewelry'
import BeerDemo from './templates/20-beer'
import PlantsDemo from './templates/21-plants'
import CoffeeDemo from './templates/22-coffee'
import PetFoodDemo from './templates/23-petfood'
import RestaurantDemo from './templates/24-restaurant'
import ConstructionDemo from './templates/25-construction'
import MedicalDemo from './templates/26-medical'
import AutoRepairDemo from './templates/27-autorepair'
import SpaDemo from './templates/28-spa'
import LogisticsDemo from './templates/29-logistics'
import PropertyDemo from './templates/30-property'
import StaffingDemo from './templates/31-staffing'
import EventsDemo from './templates/32-events'
import FranchiseDemo from './templates/33-franchise'
import ManufacturingDemo from './templates/34-manufacturing'
import BookingDemo from './templates/35-booking'
import AnalyticsDemo from './templates/36-analytics'
import MembershipDemo from './templates/37-membership'
import CrmDemo from './templates/38-crm'
import InventoryDemo from './templates/39-inventory'
import WorkflowDemo from './templates/40-workflow'
import GenericDemo from './templates/GenericDemo'

interface DemoFrameProps {
  demo: Demo
}

export default function DemoFrame({ demo }: DemoFrameProps) {
  const [showInstructions, setShowInstructions] = useState(true)
  const [viewMode, setViewMode] = useState<'customer' | 'admin'>('customer')

  useEffect(() => {
    // Initialize localStorage for this demo
    const demoKey = `demo_${demo.id}`
    if (!localStorage.getItem(demoKey)) {
      localStorage.setItem(demoKey, JSON.stringify({
        initialized: true,
        data: {}
      }))
    }

    // Clear demo data when user leaves the site
    const handleBeforeUnload = () => {
      localStorage.removeItem(demoKey)
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [demo.id])

  // Get colors for this demo
  const colors = demoColorPalettes[demo.slug] || demoColorPalettes['classic-cuts-barbershop']

  // Render the appropriate demo template based on demo slug
  const renderDemo = () => {
    // Plug & Play demos (1-5)
    if (demo.slug === 'classic-cuts-barbershop') {
      return <BarbershopDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'fixit-fast-handyman') {
      return <HandymanDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'lens-light-photography') {
      return <PhotographyDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'sparkle-clean-services') {
      return <CleaningDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'smart-start-tutoring') {
      return <TutoringDemo demo={demo} colors={colors} />

    // Website Rebuild demos (6-9)
    } else if (demo.slug === 'green-valley-landscaping') {
      return <LandscapingDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'bright-smile-dental') {
      return <DentalDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'peak-financial-advisors') {
      return <AccountingDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'glamour-studio-salon') {
      return <SalonDemo demo={demo} colors={colors} />

    // Standard Website demos (10-15)
    } else if (demo.slug === 'cool-breeze-hvac') {
      return <HvacDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'justice-associates-law') {
      return <LawFirmDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'premier-plumbing-pros') {
      return <PlumbingDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'skyline-realty-group') {
      return <RealEstateDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'iron-temple-fitness') {
      return <GymDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'paws-care-animal-hospital') {
      return <VeterinaryDemo demo={demo} colors={colors} />

    // E-Commerce demos (16-23)
    } else if (demo.slug === 'bella-boutique-fashion') {
      return <BoutiqueDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'sweet-dreams-bakery') {
      return <BakeryDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'peak-performance-supplements') {
      return <SupplementsDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'timeless-treasures-jewelry') {
      return <JewelryDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'hoppy-trails-craft-beer') {
      return <BeerDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'urban-jungle-plant-shop') {
      return <PlantsDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'roasted-perfection-coffee') {
      return <CoffeeDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'happy-paws-pet-supplies') {
      return <PetFoodDemo demo={demo} colors={colors} />

    // Premium Build demos (24-29)
    } else if (demo.slug === 'gourmet-kitchen-restaurant') {
      return <RestaurantDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'buildright-construction') {
      return <ConstructionDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'healthfirst-medical-group') {
      return <MedicalDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'precision-auto-repair') {
      return <AutoRepairDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'serenity-spa-wellness') {
      return <SpaDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'swift-logistics-services') {
      return <LogisticsDemo demo={demo} colors={colors} />

    // Custom Business Platform demos (30-32)
    } else if (demo.slug === 'elite-property-management') {
      return <PropertyDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'premier-staffing-solutions') {
      return <StaffingDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'celebration-events-company') {
      return <EventsDemo demo={demo} colors={colors} />

    // Enterprise Platform demos (33-34)
    } else if (demo.slug === 'fastserve-franchise-network') {
      return <FranchiseDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'techpro-manufacturing') {
      return <ManufacturingDemo demo={demo} colors={colors} />

    // Feature Showcase demos (35-40)
    } else if (demo.slug === 'booking-system-showcase') {
      return <BookingDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'analytics-dashboard-showcase') {
      return <AnalyticsDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'membership-portal-showcase') {
      return <MembershipDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'crm-system-showcase') {
      return <CrmDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'inventory-management-showcase') {
      return <InventoryDemo demo={demo} colors={colors} />
    } else if (demo.slug === 'workflow-automation-showcase') {
      return <WorkflowDemo demo={demo} colors={colors} />

    // Default generic template
    } else {
      return <GenericDemo demo={demo} colors={colors} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Demo Controls Bar */}
      <div className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Left: Demo Info */}
            <div className="flex items-center gap-4">
              <Link
                href="/demos"
                className="text-sm font-semibold hover:text-accent-400 transition-colors flex items-center gap-2"
              >
                ← Back to Demos
              </Link>
              <div className="h-6 w-px bg-gray-700"></div>
              <div>
                <h1 className="text-sm font-bold">{demo.name}</h1>
                <p className="text-xs text-gray-400">{demo.package}</p>
              </div>
            </div>

            {/* Center: View Mode Toggle */}
            <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('customer')}
                className={`px-4 py-2 rounded text-sm font-semibold transition-colors ${
                  viewMode === 'customer'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                👤 Customer View
              </button>
              <button
                onClick={() => setViewMode('admin')}
                className={`px-4 py-2 rounded text-sm font-semibold transition-colors ${
                  viewMode === 'admin'
                    ? 'bg-accent-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🔐 Admin Dashboard
              </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowInstructions(!showInstructions)}
                className="text-sm font-semibold hover:text-accent-400 transition-colors"
              >
                {showInstructions ? '✕ Hide' : 'ℹ️ Show'} Instructions
              </button>
              <Link
                href="/contact"
                className="bg-accent-500 hover:bg-accent-600 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                Build This →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions Banner */}
      {showInstructions && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-start gap-4">
              <div className="text-3xl">💡</div>
              <div className="flex-1">
                <h3 className="font-bold text-blue-900 mb-2">This is a Fully Interactive Demo</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Click around, fill out forms, and test all features—everything works!</li>
                  <li>• Switch between <strong>Customer View</strong> (what your clients see) and <strong>Admin Dashboard</strong> (your control panel)</li>
                  <li>• All data is stored locally and will be cleared when you close this tab</li>
                  <li>• Resize your browser to see the responsive mobile design</li>
                </ul>
              </div>
              <button
                onClick={() => setShowInstructions(false)}
                className="text-blue-600 hover:text-blue-800 text-xl"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Demo Content */}
      <div className="demo-container">
        {renderDemo()}
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-40">
        <Link
          href="/contact"
          className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-4 rounded-full shadow-2xl font-bold text-sm flex items-center gap-2 transition-all hover:scale-105"
        >
          <span>💼</span>
          <span>Want This for Your Business?</span>
        </Link>
      </div>
    </div>
  )
}
