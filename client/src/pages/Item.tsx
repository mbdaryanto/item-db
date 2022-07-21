import { useParams } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/client"
import { Formik, Form, Field, FieldProps } from "formik"
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react"
import { GET_ITEM, GetItemResultType, GetItemVarType, UPDATE_ITEM, UpdateItemVarType, UpdateItemResponseType } from "../components/queries"
import QueryResult from "../components/QueryResult"
import * as yup from "yup"


const itemSchema = yup.object({
  barcode: yup.string().required(),
  name: yup.string().required(),
  description: yup.string().optional(),
  sellingPrice: yup.number().required(),
})

const updateItemSchema = itemSchema.shape({
  id: yup.string().required(),
})


function ItemPage() {
  const { itemId } = useParams()
  console.log('ItemPage', itemId)
  const { loading, error, data } = useQuery<GetItemResultType, GetItemVarType>(
    GET_ITEM,
    {
      variables: {
        id: itemId ?? ''
      }
    }
  )

  const [updateItem, updateItemStatus] = useMutation<UpdateItemResponseType, UpdateItemVarType>(
    UPDATE_ITEM
  )

  return (
    <QueryResult loading={loading} error={error} data={data}>
      {!!data && !!data.item && (
        <Formik
          initialValues={data.item}
          validationSchema={updateItemSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const item = await updateItemSchema.validate(values)
            console.log('submitted values: ', item)
            await updateItem({
              variables: item
            })
            setSubmitting(false)
          }}
        >
          {({ errors, isSubmitting }) => (
            <Form>
              <Field name="barcode">
                {({ field, meta }: FieldProps<string>) => (
                  <FormControl isRequired isInvalid={!!meta.error && meta.touched}>
                    <FormLabel>Barcode</FormLabel>
                    <Input type="text" {...field}/>
                    <FormErrorMessage>{ meta.error }</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="name">
                {({ field, meta }: FieldProps<string>) => (
                  <FormControl isRequired isInvalid={!!meta.error && meta.touched}>
                    <FormLabel>Name</FormLabel>
                    <Input type="text" {...field}/>
                    <FormErrorMessage>{ meta.error }</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="description">
                {({ field, meta }: FieldProps<string>) => (
                  <FormControl isInvalid={!!meta.error && meta.touched}>
                    <FormLabel>Description</FormLabel>
                    <Input type="text" {...field}/>
                    <FormErrorMessage>{ meta.error }</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="sellingPrice">
                {({ field, meta }: FieldProps<string>) => (
                  <FormControl isRequired isInvalid={!!meta.error && meta.touched}>
                    <FormLabel>Selling Price</FormLabel>
                    <Input type="text" {...field}/>
                    <FormErrorMessage>{ meta.error }</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button type="submit" isLoading={isSubmitting || updateItemStatus.loading} onClick={(ev) => console.log(errors)}>Save</Button>
            </Form>
          )}
        </Formik>
      )}
    </QueryResult>
  )
}

export default ItemPage
