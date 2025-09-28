import React from 'react';

export default function Pricing(){
  const plans = [
    { id: 'free', name: 'Free', price: '0', features: ['1 template', 'Basic export'] },
    { id: 'pro', name: 'Pro', price: '9.99', features: ['All templates', 'PDF export', 'Cloud save'] }
  ];

  return (
    <div>
      <h2>Pricing</h2>
      <div className="row g-3">
        {plans.map(p => (
          <div key={p.id} className="col-md-4">
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <h5>{p.name}</h5>
                <h3>${p.price}/mo</h3>
                <ul>
                  {p.features.map((f,i) => <li key={i}>{f}</li>)}
                </ul>
                <button className="btn btn-primary mt-auto">Choose</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
