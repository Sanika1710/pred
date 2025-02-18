"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MultiSelect } from "./multi-select"

export default function Home() {
  const router = useRouter()
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [duration, setDuration] = useState<string>("")
  const [additionalInfo, setAdditionalInfo] = useState<string>("")
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false)

  const symptoms = [
    { value: "fever", label: "Fever" },
    { value: "cough", label: "Cough" },
    { value: "fatigue", label: "Fatigue" },
    { value: "shortness-of-breath", label: "Shortness of breath" },
    { value: "headache", label: "Headache" },
    { value: "body-aches", label: "Body aches" },
    { value: "sore-throat", label: "Sore throat" },
    { value: "runny-nose", label: "Runny nose" },
    { value: "nausea", label: "Nausea" },
    { value: "diarrhea", label: "Diarrhea" },
  ]

  const durations = [
    { value: "1-3", label: "1-3 days" },
    { value: "4-7", label: "4-7 days" },
    { value: "1-2", label: "1-2 weeks" },
    { value: "2+", label: "More than 2 weeks" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedSymptoms.length === 0 || !duration || !agreedToTerms) {
      alert("Please fill in all required fields and agree to the terms.")
      return
    }

    router.push(
      `/results?symptoms=${selectedSymptoms.join(",")}&duration=${duration}&info=${encodeURIComponent(additionalInfo)}`
    )
  }

  const handleClear = () => {
    setSelectedSymptoms([])
    setDuration("")
    setAdditionalInfo("")
    setAgreedToTerms(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 text-gray-900">
      <h1 className="text-4xl font-bold mb-8 text-center">Disease Predictor</h1>
      <div className="max-w-3xl mx-auto border rounded-md p-4 bg-white shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Enter Your Symptoms</h2>
            <p>Select all symptoms that apply to you for an accurate prediction.</p>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <label htmlFor="symptoms" className="font-medium">Symptoms</label>
              <MultiSelect
                options={symptoms}
                selected={selectedSymptoms}
                onChange={setSelectedSymptoms}
                placeholder="Select symptoms..."
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="duration" className="font-medium">Duration of Symptoms</label>
              <select
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="border rounded-md p-2"
              >
                {durations.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="additional-info" className="font-medium">Additional Information</label>
              <textarea
                id="additional-info"
                placeholder="Enter any additional information about your symptoms or medical history"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="h-4 w-4"
              />
              <label htmlFor="terms" className="font-medium">I agree to the terms and conditions</label>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handleClear}
              className="border rounded-md px-4 py-2 bg-gray-100"
            >
              Clear
            </button>
            <button
              type="submit"
              className="border rounded-md px-4 py-2 bg-blue-500 text-white"
            >
              Predict Diseases
            </button>
          </div>
        </form>
      </div>

      {/* How It Works Section */}
      <div className="max-w-3xl mx-auto mt-10 border rounded-md p-6 bg-white shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">How It Works</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li><strong>Select Symptoms:</strong> Choose the symptoms you are experiencing from the list.</li>
          <li><strong>Set Duration:</strong> Select how long you have been experiencing these symptoms.</li>
          <li><strong>Provide Additional Info:</strong> If needed, you can add extra details about your condition.</li>
          <li><strong>Agree to Terms:</strong> Ensure you check the agreement box to proceed.</li>
          <li><strong>Get Prediction:</strong> Click the "Predict Diseases" button to see possible conditions.</li>
          <li><strong>View Results:</strong> You’ll be redirected to a results page with potential diagnoses.</li>
        </ol>
      </div>
    </div>
  )
}
