
const DepositoRoutes = () => {
  const str='PO1008'
  const rgex= /^[A-Z]{2}[0-9]{4}$/
  const result=rgex.test(str)
  console.log(result)
  return(
    <>
      Deposito 
    </>
  )
}
export default DepositoRoutes