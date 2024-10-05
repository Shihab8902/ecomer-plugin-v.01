import { Oval } from 'react-loader-spinner'

const LoaderSpinner = ({ shapeWidth, shapeHeight, shapeColor }: { shapeWidth: string, shapeHeight: string, shapeColor: string }) => {
    return <div className='flex h-screen justify-center items-center'>
        <Oval
            visible={true}
            height={shapeHeight || "40"}
            width={shapeWidth || "40"}
            color={shapeColor || "#6E717D"}
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            secondaryColor='#6E717D'
            wrapperClass=""
        />
    </div>
}

export default LoaderSpinner