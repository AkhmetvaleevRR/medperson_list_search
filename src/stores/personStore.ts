import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Iperson, Ispecialization, iCounter } from '../Interfaces'

export const usePersonStore = defineStore('person', () => {
  const pageSize = ref(5) // кол-во записей на странице
  const currentSpec = ref(NaN) //текущий фильтр по специальности
  const currentPage = ref(0) //текущая страница

  //данные в таблице
  const personList: Array<Iperson> = [
    {
      id: 300425,
      lastName: 'Керимов',
      firstName: 'Орхан',
      middleName: 'Илхамович',
      specializationList: [
        {
          id: 4
        },
        {
          id: 2
        }
      ]
    },
    {
      id: 300421,
      lastName: 'Прохоренкова',
      firstName: 'Елизавета',
      middleName: 'Алексеевна',
      specializationList: [
        {
          id: 1
        }
      ]
    },
    {
      id: 300422,
      lastName: 'Воеводина',
      firstName: 'Марина',
      middleName: 'Алексеевна',
      specializationList: [
        {
          id: 9
        }
      ]
    }
  ]
  const specializationList: Array<Ispecialization> = [
    {
      id: 2,
      name: 'Терапевт'
    },
    {
      id: 1,
      name: 'Психолог'
    },
    {
      id: 4,
      name: 'Стоматолог-хирург'
    },
    {
      id: 3,
      name: 'Стоматолог'
    },
    {
      id: 9,
      name: 'Педиатр'
    },
    {
      id: 15,
      name: 'Гастроэнтеролог'
    },
    {
      id: 16,
      name: 'Гинеколог'
    },
    {
      id: 17,
      name: 'Дерматолог'
    },
    {
      id: 21,
      name: 'Невролог'
    }
  ]

  const filteredList = ref<Array<any>>([]) //копия объекта с данными
  const counters = ref<iCounter>({
    total: 0,
    pages: 0
  })

  // Счетчик всех активных специальностей, для блокировки кнопок фильтрации
  const countSpecs = () => {
    const specList = new Set<number>()
    for (const item of personList) {
      const specIdArray = item.specializationList.map((spec) => spec.id)
      specIdArray.forEach((item) => specList.add(item))
    }
    return specList
  }

  // информация для пагинации
  const addListInfo = (list: Array<Iperson>) => {
    counters.value.total = list.length
    counters.value.pages = Math.ceil(list.length / pageSize.value)

    const pagedArr = list.reduce((acc: Array<any>, val, i) => {
      const idx = Math.floor(i / pageSize.value)
      const page: Array<Iperson> = acc[idx] || (acc[idx] = [])
      page.push(val)
      return acc
    }, [])
    filteredList.value = pagedArr
    const result = {}
    return result
  }

  //Функция фильтрации
  const filterList = () => {
    let personArray: Array<Iperson> = []
    if (currentSpec.value) {
      for (const person of personList) {
        const specIdArray = person.specializationList.map((spec) => spec.id)
        if (specIdArray.includes(currentSpec.value)) {
          personArray.push(person)
        }
      }
    } else {
      personArray = personList
    }
    currentPage.value = 0
    addListInfo(personArray)
  }

  return {
    filteredList,
    specializationList,
    pageSize,
    counters,
    currentSpec,
    currentPage,
    countSpecs,
    filterList
  }
})
