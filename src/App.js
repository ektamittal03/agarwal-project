
import './App.css';
import img1 from './images/agarsen.jpeg'
import React ,{useState,useRef,useEffect}from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


function App() {
const [data,setData]=useState(null);

  function getData(val)
  {
    console.warn(val.target.value)
    setData(val.target.value.toUpperCase())
    
  }
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const fileInputRef = useRef();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result );
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const exportPDF= ()=>{
    const input = document.getElementById("app")
    html2canvas(input,{logging: true, letterRendering: 1, useCORS: true}).then(canvas => {
      const imgwidth = 208;
      const imgheight = 400;
      const imgData = canvas.toDataURL('img/png');
      const pdf = new jsPDF('p','mm','a4');
      pdf.addImage(imgData,'PNG',0,0,imgwidth,imgheight);
      pdf.save(data)

    })
  }

  return (
    <div className="appName">
      <header id = "app" className = "new">
     <img
            src={img1}
            alt="" height = {600} width={800}
          />
      
       <h1 className = "head"> {data}</h1>
       <img className="photo"
            src={preview}
            style={{ objectFit: "cover" }}
            onClick={() => {
              setImage(null);
            }}
          />
      
     
    <input  className = "inbox" type="text" placeHolder = "name"onChange={getData} />

    
          
          
          
          <button className = "photobtn"
            onClick={(event) => {
              event.preventDefault();
              fileInputRef.current.click();
            }}
          >
            Add Image
          </button>
      
    <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          accept="image/*"
          onChange={(event) => {
            const file = event.target.files[0];
            if (file && file.type.substr(0, 5) === "image") {
              setImage(file);
            } else {
              setImage(null);
            }
          }}
        />

        <button className = "pdfbtn" onClick= {() => exportPDF()} > PRINT PDF</button>
        </header>
    </div>
  );
}

export default App;
