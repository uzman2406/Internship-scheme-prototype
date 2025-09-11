import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const LocationStep = ({ 
  formData, 
  onFormDataChange, 
  errors = {},
  currentLanguage = 'en' 
}) => {
  const stateOptions = [
    { value: 'andhra-pradesh', label: currentLanguage === 'hi' ? 'आंध्र प्रदेश' : 'Andhra Pradesh' },
    { value: 'arunachal-pradesh', label: currentLanguage === 'hi' ? 'अरुणाचल प्रदेश' : 'Arunachal Pradesh' },
    { value: 'assam', label: currentLanguage === 'hi' ? 'असम' : 'Assam' },
    { value: 'bihar', label: currentLanguage === 'hi' ? 'बिहार' : 'Bihar' },
    { value: 'chhattisgarh', label: currentLanguage === 'hi' ? 'छत्तीसगढ़' : 'Chhattisgarh' },
    { value: 'delhi', label: currentLanguage === 'hi' ? 'दिल्ली' : 'Delhi' },
    { value: 'goa', label: currentLanguage === 'hi' ? 'गोवा' : 'Goa' },
    { value: 'gujarat', label: currentLanguage === 'hi' ? 'गुजरात' : 'Gujarat' },
    { value: 'haryana', label: currentLanguage === 'hi' ? 'हरियाणा' : 'Haryana' },
    { value: 'himachal-pradesh', label: currentLanguage === 'hi' ? 'हिमाचल प्रदेश' : 'Himachal Pradesh' },
    { value: 'jharkhand', label: currentLanguage === 'hi' ? 'झारखंड' : 'Jharkhand' },
    { value: 'karnataka', label: currentLanguage === 'hi' ? 'कर्नाटक' : 'Karnataka' },
    { value: 'kerala', label: currentLanguage === 'hi' ? 'केरल' : 'Kerala' },
    { value: 'madhya-pradesh', label: currentLanguage === 'hi' ? 'मध्य प्रदेश' : 'Madhya Pradesh' },
    { value: 'maharashtra', label: currentLanguage === 'hi' ? 'महाराष्ट्र' : 'Maharashtra' },
    { value: 'manipur', label: currentLanguage === 'hi' ? 'मणिपुर' : 'Manipur' },
    { value: 'meghalaya', label: currentLanguage === 'hi' ? 'मेघालय' : 'Meghalaya' },
    { value: 'mizoram', label: currentLanguage === 'hi' ? 'मिजोरम' : 'Mizoram' },
    { value: 'nagaland', label: currentLanguage === 'hi' ? 'नागालैंड' : 'Nagaland' },
    { value: 'odisha', label: currentLanguage === 'hi' ? 'ओडिशा' : 'Odisha' },
    { value: 'punjab', label: currentLanguage === 'hi' ? 'पंजाब' : 'Punjab' },
    { value: 'rajasthan', label: currentLanguage === 'hi' ? 'राजस्थान' : 'Rajasthan' },
    { value: 'sikkim', label: currentLanguage === 'hi' ? 'सिक्किम' : 'Sikkim' },
    { value: 'tamil-nadu', label: currentLanguage === 'hi' ? 'तमिल नाडु' : 'Tamil Nadu' },
    { value: 'telangana', label: currentLanguage === 'hi' ? 'तेलंगाना' : 'Telangana' },
    { value: 'tripura', label: currentLanguage === 'hi' ? 'त्रिपुरा' : 'Tripura' },
    { value: 'uttar-pradesh', label: currentLanguage === 'hi' ? 'उत्तर प्रदेश' : 'Uttar Pradesh' },
    { value: 'uttarakhand', label: currentLanguage === 'hi' ? 'उत्तराखंड' : 'Uttarakhand' },
    { value: 'west-bengal', label: currentLanguage === 'hi' ? 'पश्चिम बंगाल' : 'West Bengal' }
  ];

  // Mock district data based on selected state
  const getDistrictOptions = (state) => {
    const districtMap = {
      'maharashtra': [
        { value: 'mumbai', label: currentLanguage === 'hi' ? 'मुंबई' : 'Mumbai' },
        { value: 'pune', label: currentLanguage === 'hi' ? 'पुणे' : 'Pune' },
        { value: 'nagpur', label: currentLanguage === 'hi' ? 'नागपुर' : 'Nagpur' },
        { value: 'nashik', label: currentLanguage === 'hi' ? 'नाशिक' : 'Nashik' },
        { value: 'aurangabad', label: currentLanguage === 'hi' ? 'औरंगाबाद' : 'Aurangabad' }
      ],
      'karnataka': [
        { value: 'bangalore', label: currentLanguage === 'hi' ? 'बेंगलुरु' : 'Bangalore' },
        { value: 'mysore', label: currentLanguage === 'hi' ? 'मैसूर' : 'Mysore' },
        { value: 'hubli', label: currentLanguage === 'hi' ? 'हुबली' : 'Hubli' },
        { value: 'mangalore', label: currentLanguage === 'hi' ? 'मंगलौर' : 'Mangalore' }
      ],
      'tamil-nadu': [
        { value: 'chennai', label: currentLanguage === 'hi' ? 'चेन्नई' : 'Chennai' },
        { value: 'coimbatore', label: currentLanguage === 'hi' ? 'कोयंबटूर' : 'Coimbatore' },
        { value: 'madurai', label: currentLanguage === 'hi' ? 'मदुरै' : 'Madurai' },
        { value: 'salem', label: currentLanguage === 'hi' ? 'सेलम' : 'Salem' }
      ],
      'delhi': [
        { value: 'new-delhi', label: currentLanguage === 'hi' ? 'नई दिल्ली' : 'New Delhi' },
        { value: 'north-delhi', label: currentLanguage === 'hi' ? 'उत्तर दिल्ली' : 'North Delhi' },
        { value: 'south-delhi', label: currentLanguage === 'hi' ? 'दक्षिण दिल्ली' : 'South Delhi' },
        { value: 'east-delhi', label: currentLanguage === 'hi' ? 'पूर्व दिल्ली' : 'East Delhi' }
      ],
      'uttar-pradesh': [
        { value: 'lucknow', label: currentLanguage === 'hi' ? 'लखनऊ' : 'Lucknow' },
        { value: 'kanpur', label: currentLanguage === 'hi' ? 'कानपुर' : 'Kanpur' },
        { value: 'agra', label: currentLanguage === 'hi' ? 'आगरा' : 'Agra' },
        { value: 'varanasi', label: currentLanguage === 'hi' ? 'वाराणसी' : 'Varanasi' },
        { value: 'allahabad', label: currentLanguage === 'hi' ? 'इलाहाबाद' : 'Allahabad' }
      ]
    };

    return districtMap?.[state] || [
      { value: 'district-1', label: currentLanguage === 'hi' ? 'जिला 1' : 'District 1' },
      { value: 'district-2', label: currentLanguage === 'hi' ? 'जिला 2' : 'District 2' },
      { value: 'district-3', label: currentLanguage === 'hi' ? 'जिला 3' : 'District 3' }
    ];
  };

  const handleStateChange = (value) => {
    onFormDataChange({
      ...formData,
      state: value,
      district: '' // Reset district when state changes
    });
  };

  const handleDistrictChange = (value) => {
    onFormDataChange({
      ...formData,
      district: value
    });
  };

  const districtOptions = formData?.state ? getDistrictOptions(formData?.state) : [];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="MapPin" size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
          {currentLanguage === 'hi' ? 'स्थान की जानकारी' : 'Location Information'}
        </h2>
        <p className="text-muted-foreground">
          {currentLanguage === 'hi' ?'आप कहाँ से हैं और कहाँ काम करना चाहते हैं?' :'Where are you from and where would you like to work?'
          }
        </p>
      </div>
      <div className="max-w-md mx-auto space-y-6">
        {/* State Selection */}
        <div>
          <Select
            label={currentLanguage === 'hi' ? 'राज्य' : 'State'}
            placeholder={currentLanguage === 'hi' ? 'अपना राज्य चुनें' : 'Select your state'}
            options={stateOptions}
            value={formData?.state || ''}
            onChange={handleStateChange}
            error={errors?.state}
            required
            searchable
          />
        </div>

        {/* District Selection */}
        <div>
          <Select
            label={currentLanguage === 'hi' ? 'जिला' : 'District'}
            placeholder={
              formData?.state 
                ? (currentLanguage === 'hi' ? 'अपना जिला चुनें' : 'Select your district')
                : (currentLanguage === 'hi' ? 'पहले राज्य चुनें' : 'First select a state')
            }
            options={districtOptions}
            value={formData?.district || ''}
            onChange={handleDistrictChange}
            error={errors?.district}
            required
            disabled={!formData?.state}
            searchable
          />
        </div>

        {/* Work Preference */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h3 className="text-sm font-medium text-foreground mb-3">
            {currentLanguage === 'hi' ? 'काम की प्राथमिकता' : 'Work Preference'}
          </h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="workPreference"
                value="local"
                checked={formData?.workPreference === 'local'}
                onChange={(e) => onFormDataChange({
                  ...formData,
                  workPreference: e?.target?.value
                })}
                className="w-4 h-4 text-primary"
              />
              <span className="text-sm">
                {currentLanguage === 'hi' ? 'अपने शहर/जिले में काम करना चाहते हैं' : 'Want to work in my city/district'}
              </span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="workPreference"
                value="anywhere"
                checked={formData?.workPreference === 'anywhere'}
                onChange={(e) => onFormDataChange({
                  ...formData,
                  workPreference: e?.target?.value
                })}
                className="w-4 h-4 text-primary"
              />
              <span className="text-sm">
                {currentLanguage === 'hi' ? 'कहीं भी काम कर सकते हैं' : 'Open to work anywhere'}
              </span>
            </label>
          </div>
        </div>

        {formData?.state && formData?.district && (
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm text-success font-medium">
                {currentLanguage === 'hi' ? 'स्थान की जानकारी पूर्ण' : 'Location Information Complete'}
              </span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {currentLanguage === 'hi' 
                ? `आपका स्थान: ${stateOptions?.find(s => s?.value === formData?.state)?.label}, ${districtOptions?.find(d => d?.value === formData?.district)?.label}` 
                : `Your location: ${stateOptions?.find(s => s?.value === formData?.state)?.label}, ${districtOptions?.find(d => d?.value === formData?.district)?.label}`
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationStep;