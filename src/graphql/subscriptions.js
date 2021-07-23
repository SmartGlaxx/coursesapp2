/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateShop = /* GraphQL */ `
  subscription OnCreateShop {
    onCreateShop {
      id
      name
      products {
        items {
          id
          name
          description
          owner
          price
          createdAt
          updatedAt
        }
        nextToken
      }
      tags
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateShop = /* GraphQL */ `
  subscription OnUpdateShop {
    onUpdateShop {
      id
      name
      products {
        items {
          id
          name
          description
          owner
          price
          createdAt
          updatedAt
        }
        nextToken
      }
      tags
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteShop = /* GraphQL */ `
  subscription OnDeleteShop {
    onDeleteShop {
      id
      name
      products {
        items {
          id
          name
          description
          owner
          price
          createdAt
          updatedAt
        }
        nextToken
      }
      tags
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct {
    onCreateProduct {
      id
      name
      description
      shop {
        id
        name
        products {
          nextToken
        }
        tags
        owner
        createdAt
        updatedAt
      }
      file {
        bucket
        region
        key
      }
      owner
      price
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct {
    onUpdateProduct {
      id
      name
      description
      shop {
        id
        name
        products {
          nextToken
        }
        tags
        owner
        createdAt
        updatedAt
      }
      file {
        bucket
        region
        key
      }
      owner
      price
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct {
    onDeleteProduct {
      id
      name
      description
      shop {
        id
        name
        products {
          nextToken
        }
        tags
        owner
        createdAt
        updatedAt
      }
      file {
        bucket
        region
        key
      }
      owner
      price
      createdAt
      updatedAt
    }
  }
`;
