import '@testing-library/jest-dom'
import { getType } from 'jest-get-type'
import { TextEncoder, TextDecoder } from 'util'

Object.assign(global, { TextEncoder, TextDecoder })