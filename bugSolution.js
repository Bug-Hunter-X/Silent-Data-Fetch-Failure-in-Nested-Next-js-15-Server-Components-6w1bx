// bugSolution.js

export default async function ParentComponent() {
  try {
    const parentData = await fetchParentData();
    const childData = await fetchChildData(parentData);
    return (
      <div>
        <h1>Parent Component</h1>
        <ChildComponent data={childData} />
      </div>
    );
  } catch (error) {
    console.error('Error in ParentComponent:', error);
    return <div>Error fetching data.</div>;
  }
}

async function fetchParentData() {
  // Simulate a fetch to get parentData
  return { id: 1 };
}

async function fetchChildData(parentData) {
  try {
    // Simulate a fetch that depends on parentData
    const response = await fetch(`/api/data?parentId=${parentData.id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch child data.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error in fetchChildData:', error);
    throw error; // Re-throw to allow parent component to handle
  }
}

function ChildComponent({ data }) {
  if (!data) {
    return <div>Loading child data...</div>;
  }
  return (
    <div>
      <h2>Child Component</h2>
      <p>Data: {JSON.stringify(data)}</p>
    </div>
  );
}

//Simulate API route
export const api = {
  '/api/data': async (req, res) => {
      const parentId = req.query.parentId;
      if (parentId === '1') {
          res.json({ childData: 'Success!'})
      } else {
          res.status(500).json({error: 'Failed!'})
      }
  }
}