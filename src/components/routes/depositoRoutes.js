
const DepositoRoutes = () => {
  const str= 2500
  const rgex= /^([1-9]|[1-9][0-9]|[1-9][0-9][0-9])$/
  const result=rgex.test(str)
  console.log(result)
  return(
    <>
      Deposito 
    </>
  )
}
export default DepositoRoutes