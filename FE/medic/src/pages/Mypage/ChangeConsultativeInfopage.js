import React, { useEffect, useState } from "react";
import axios from "axios";
import ChangeConsultativeInfo from '../../css/ChangeConsultativeInfopage.module.css'
import { useLocation, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

export default function ChangeConsultativeInfopage(){
    const location = useLocation()
    const myInfo = location.state.myInfo

    const [cId, setCId] = useState(myInfo.cId)
    const [cRole, setCRole] = useState(myInfo.cRole)
    const [cPw, setCPw] = useState(myInfo.cPw)
    const [department, setDepartment] = useState(myInfo.department)
    const [cName, setCName] = useState(myInfo.cName)
    const [cEmail, setCEmail] = useState(myInfo.cEmail)
    const [cTel, setCTel] = useState(myInfo.cTel)
    const [cPhone, setCPhone] = useState(myInfo.cPhone)
    const [zipcodeNum, setZipcodeNum] = useState(myInfo.cZipcodeNum)
    const [zipcode, setZipcode] = useState(myInfo.cZipCode)
    const [detailAddress, setDetailAddress] = useState(myInfo.cDetailAddress)
    const [cAddress, setCAddress] = useState(myInfo.cAddress)

    const [hospName, setHospName] = useState(myInfo.hospName)
    const [hospTel, setHospTel] = useState(myInfo.hospTel)
    const [hospFx, setHospFx] = useState(myInfo.hospFx)
    const [hospNum, setHospNum] = useState(myInfo.hospNum)
    const [detailHpAddress, setDetailHpAddress] = useState(myInfo.detailHpAddress)
    const [hospAddress, setHospAddress] = useState(myInfo.hospAddress)
    const [hpZipcodeNum, setHpZipcodeNum] = useState(myInfo.hpZipcodeNum)
    const [hpZipcode, setHpZipcode] = useState(myInfo.hpZipcode)

    const [infoEmpty, setInfoEmpty] = useState(false)

    const navigate = useNavigate()
    const cookie = new Cookies()

    const [consultative, setConsultative] = useState(true)

    const [medicine, setMedicine] = useState(false)
    const [neurology, setNeurology] = useState(false)
    const [psychiatry, setPsychiatry] = useState(false)
    const [surgery, setSurgery] = useState(false)
    const [orthopedics, setOrthopedics] = useState(false)
    const [neurosurgery, setNeurosurgery] = useState(false)
    const [thoracicsurgery, setThoracicsurgery] = useState(false)
    const [plasticsurgery, setPlasticsurgery] = useState(false)
    const [anesthesiology, setAnesthesiology] = useState(false)
    const [obstetrics, setObstetrics] = useState(false)
    const [pediatrics, setPediatrics] = useState(false)
    const [ophthalmology, setOphthalmology] = useState(false)
    const [dermatology, setDermatology] = useState(false)
    const [otorhinolaryngology, setOtorhinolaryngology] = useState(false)
    const [urology, setUrology] = useState(false)
    const [radiology, setRadiology] = useState(false)
    const [radiation, setRadiation] = useState(false)
    const [pathology, setPathology] = useState(false)
    const [laboratory, setLaboratory] = useState(false)
    const [tuberculosis, setTuberculosis] = useState(false)
    const [rehabilitation, setRehabilitation] = useState(false)
    const [preventive, setPreventive] = useState(false)
    const [familymedicine, setFamilymedicine] = useState(false)
    const [emergency, setEmergency] = useState(false)
    const [nuclear, setNuclear] = useState(false)
    const [occupational, setOccupational] = useState(false)

    useEffect(() => {
        console.log(myInfo);
    }, [myInfo]);

    const selectCRole = (c_role) => {
        switch (c_role) {
            case 'consultative':
                setConsultative(true)
                break;
            default:
                break;
        }
    }

    const selectDepartment = (department) => {
        switch (department) {
            case 'medicine':
                setMedicine(true)
                setNeurology(false)
                setPsychiatry(false)
                setSurgery(false)
                setOrthopedics(false)
                setNeurosurgery(false)
                setThoracicsurgery(false)
                setPlasticsurgery(false)
                setAnesthesiology(false)
                setObstetrics(false)
                setPediatrics(false)
                setOphthalmology(false)
                setDermatology(false)
                setOtorhinolaryngology(false)
                setUrology(false)
                setRadiology(false)
                setRadiation(false)
                setPathology(false)
                setLaboratory(false)
                setTuberculosis(false)
                setRehabilitation(false)
                setPreventive(false)
                setFamilymedicine(false)
                setEmergency(false)
                setNuclear(false)
                setOccupational(false)
                break;
            case 'neurology':
                setMedicine(false)
                setNeurology(true)
                setPsychiatry(false)
                setSurgery(false)
                setOrthopedics(false)
                setNeurosurgery(false)
                setThoracicsurgery(false)
                setPlasticsurgery(false)
                setAnesthesiology(false)
                setObstetrics(false)
                setPediatrics(false)
                setOphthalmology(false)
                setDermatology(false)
                setOtorhinolaryngology(false)
                setUrology(false)
                setRadiology(false)
                setRadiation(false)
                setPathology(false)
                setLaboratory(false)
                setTuberculosis(false)
                setRehabilitation(false)
                setPreventive(false)
                setFamilymedicine(false)
                setEmergency(false)
                setNuclear(false)
                setOccupational(false)
                break;
            case 'psychiatry':
                setMedicine(false)
                setNeurology(false)
                setPsychiatry(true)
                setSurgery(false)
                setOrthopedics(false)
                setNeurosurgery(false)
                setThoracicsurgery(false)
                setPlasticsurgery(false)
                setAnesthesiology(false)
                setObstetrics(false)
                setPediatrics(false)
                setOphthalmology(false)
                setDermatology(false)
                setOtorhinolaryngology(false)
                setUrology(false)
                setRadiology(false)
                setRadiation(false)
                setPathology(false)
                setLaboratory(false)
                setTuberculosis(false)
                setRehabilitation(false)
                setPreventive(false)
                setFamilymedicine(false)
                setEmergency(false)
                setNuclear(false)
                setOccupational(false)
                break;
            case 'surgery':
                setMedicine(false)
                setNeurology(false)
                setPsychiatry(false)
                setSurgery(true)
                setOrthopedics(false)
                setNeurosurgery(false)
                setThoracicsurgery(false)
                setPlasticsurgery(false)
                setAnesthesiology(false)
                setObstetrics(false)
                setPediatrics(false)
                setOphthalmology(false)
                setDermatology(false)
                setOtorhinolaryngology(false)
                setUrology(false)
                setRadiology(false)
                setRadiation(false)
                setPathology(false)
                setLaboratory(false)
                setTuberculosis(false)
                setRehabilitation(false)
                setPreventive(false)
                setFamilymedicine(false)
                setEmergency(false)
                setNuclear(false)
                setOccupational(false)
                break;
            case 'orthopedics':
                setMedicine(false)
                setNeurology(false)
                setPsychiatry(false)
                setSurgery(false)
                setOrthopedics(true)
                setNeurosurgery(false)
                setThoracicsurgery(false)
                setPlasticsurgery(false)
                setAnesthesiology(false)
                setObstetrics(false)
                setPediatrics(false)
                setOphthalmology(false)
                setDermatology(false)
                setOtorhinolaryngology(false)
                setUrology(false)
                setRadiology(false)
                setRadiation(false)
                setPathology(false)
                setLaboratory(false)
                setTuberculosis(false)
                setRehabilitation(false)
                setPreventive(false)
                setFamilymedicine(false)
                setEmergency(false)
                setNuclear(false)
                setOccupational(false)
                break;
            case 'neurosurgery':
                setMedicine(false)
                setNeurology(false)
                setPsychiatry(false)
                setSurgery(false)
                setOrthopedics(false)
                setNeurosurgery(true)
                setThoracicsurgery(false)
                setPlasticsurgery(false)
                setAnesthesiology(false)
                setObstetrics(false)
                setPediatrics(false)
                setOphthalmology(false)
                setDermatology(false)
                setOtorhinolaryngology(false)
                setUrology(false)
                setRadiology(false)
                setRadiation(false)
                setPathology(false)
                setLaboratory(false)
                setTuberculosis(false)
                setRehabilitation(false)
                setPreventive(false)
                setFamilymedicine(false)
                setEmergency(false)
                setNuclear(false)
                setOccupational(false)
                break;
            case 'thoracicsurgery':
                setMedicine(false)
                setNeurology(false)
                setPsychiatry(false)
                setSurgery(false)
                setOrthopedics(false)
                setNeurosurgery(false)
                setThoracicsurgery(true)
                setPlasticsurgery(false)
                setAnesthesiology(false)
                setObstetrics(false)
                setPediatrics(false)
                setOphthalmology(false)
                setDermatology(false)
                setOtorhinolaryngology(false)
                setUrology(false)
                setRadiology(false)
                setRadiation(false)
                setPathology(false)
                setLaboratory(false)
                setTuberculosis(false)
                setRehabilitation(false)
                setPreventive(false)
                setFamilymedicine(false)
                setEmergency(false)
                setNuclear(false)
                setOccupational(false)
                break;
            case 'plasticsurgery':
                setMedicine(false)
                setNeurology(false)
                setPsychiatry(false)
                setSurgery(false)
                setOrthopedics(false)
                setNeurosurgery(false)
                setThoracicsurgery(false)
                setPlasticsurgery(true)
                setAnesthesiology(false)
                setObstetrics(false)
                setPediatrics(false)
                setOphthalmology(false)
                setDermatology(false)
                setOtorhinolaryngology(false)
                setUrology(false)
                setRadiology(false)
                setRadiation(false)
                setPathology(false)
                setLaboratory(false)
                setTuberculosis(false)
                setRehabilitation(false)
                setPreventive(false)
                setFamilymedicine(false)
                setEmergency(false)
                setNuclear(false)
                setOccupational(false)
                break;
            case 'anesthesiology':
                setMedicine(false)
                setNeurology(false)
                setPsychiatry(false)
                setSurgery(false)
                setOrthopedics(false)
                setNeurosurgery(false)
                setThoracicsurgery(false)
                setPlasticsurgery(false)
                setAnesthesiology(true)
                setObstetrics(false)
                setPediatrics(false)
                setOphthalmology(false)
                setDermatology(false)
                setOtorhinolaryngology(false)
                setUrology(false)
                setRadiology(false)
                setRadiation(false)
                setPathology(false)
                setLaboratory(false)
                setTuberculosis(false)
                setRehabilitation(false)
                setPreventive(false)
                setFamilymedicine(false)
                setEmergency(false)
                setNuclear(false)
                setOccupational(false)
                break;
            case 'obstetrics':
                setMedicine(false)
                setNeurology(false)
                setPsychiatry(false)
                setSurgery(false)
                setOrthopedics(false)
                setNeurosurgery(false)
                setThoracicsurgery(false)
                setPlasticsurgery(false)
                setAnesthesiology(false)
                setObstetrics(true)
                setPediatrics(false)
                setOphthalmology(false)
                setDermatology(false)
                setOtorhinolaryngology(false)
                setUrology(false)
                setRadiology(false)
                setRadiation(false)
                setPathology(false)
                setLaboratory(false)
                setTuberculosis(false)
                setRehabilitation(false)
                setPreventive(false)
                setFamilymedicine(false)
                setEmergency(false)
                setNuclear(false)
                setOccupational(false)
                break;
            case 'pediatrics':
                setMedicine(false)
                setNeurology(false)
                setPsychiatry(false)
                setSurgery(false)
                setOrthopedics(false)
                setNeurosurgery(false)
                setThoracicsurgery(false)
                setPlasticsurgery(false)
                setAnesthesiology(false)
                setObstetrics(false)
                setPediatrics(true)
                setOphthalmology(false)
                setDermatology(false)
                setOtorhinolaryngology(false)
                setUrology(false)
                setRadiology(false)
                setRadiation(false)
                setPathology(false)
                setLaboratory(false)
                setTuberculosis(false)
                setRehabilitation(false)
                setPreventive(false)
                setFamilymedicine(false)
                setEmergency(false)
                setNuclear(false)
                setOccupational(false)
                break;
            case 'ophthalmology':
                setMedicine(false)
                setNeurology(false)
                setPsychiatry(false)
                setSurgery(false)
                setOrthopedics(false)
                setNeurosurgery(false)
                setThoracicsurgery(false)
                setPlasticsurgery(false)
                setAnesthesiology(false)
                setObstetrics(false)
                setPediatrics(false)
                setOphthalmology(true)
                setDermatology(false)
                setOtorhinolaryngology(false)
                setUrology(false)
                setRadiology(false)
                setRadiation(false)
                setPathology(false)
                setLaboratory(false)
                setTuberculosis(false)
                setRehabilitation(false)
                setPreventive(false)
                setFamilymedicine(false)
                setEmergency(false)
                setNuclear(false)
                setOccupational(false)
                break;
            case 'otorhinolaryngology':
                setMedicine(false)
                setNeurology(false)
                setPsychiatry(false)
                setSurgery(false)
                setOrthopedics(false)
                setNeurosurgery(false)
                setThoracicsurgery(false)
                setPlasticsurgery(false)
                setAnesthesiology(false)
                setObstetrics(false)
                setPediatrics(false)
                setOphthalmology(false)
                setDermatology(true)
                setOtorhinolaryngology(false)
                setUrology(false)
                setRadiology(false)
                setRadiation(false)
                setPathology(false)
                setLaboratory(false)
                setTuberculosis(false)
                setRehabilitation(false)
                setPreventive(false)
                setFamilymedicine(false)
                setEmergency(false)
                setNuclear(false)
                setOccupational(false)
                break;
            case 'dermatology':
                setMedicine(false)
                setNeurology(false)
                setPsychiatry(false)
                setSurgery(false)
                setOrthopedics(false)
                setNeurosurgery(false)
                setThoracicsurgery(false)
                setPlasticsurgery(false)
                setAnesthesiology(false)
                setObstetrics(false)
                setPediatrics(false)
                setOphthalmology(false)
                setDermatology(false)
                setOtorhinolaryngology(true)
                setUrology(false)
                setRadiology(false)
                setRadiation(false)
                setPathology(false)
                setLaboratory(false)
                setTuberculosis(false)
                setRehabilitation(false)
                setPreventive(false)
                setFamilymedicine(false)
                setEmergency(false)
                setNuclear(false)
                setOccupational(false)
                break;
            case 'urology':
                setMedicine(false)
                setNeurology(false)
                setPsychiatry(false)
                setSurgery(false)
                setOrthopedics(false)
                setNeurosurgery(false)
                setThoracicsurgery(false)
                setPlasticsurgery(false)
                setAnesthesiology(false)
                setObstetrics(false)
                setPediatrics(false)
                setOphthalmology(false)
                setDermatology(false)
                setOtorhinolaryngology(false)
                setUrology(true)
                setRadiology(false)
                setRadiation(false)
                setPathology(false)
                setLaboratory(false)
                setTuberculosis(false)
                setRehabilitation(false)
                setPreventive(false)
                setFamilymedicine(false)
                setEmergency(false)
                setNuclear(false)
                setOccupational(false)
                break;
            case 'radiology':
                setMedicine(false)
                setNeurology(false)
                setPsychiatry(false)
                setSurgery(false)
                setOrthopedics(false)
                setNeurosurgery(false)
                setThoracicsurgery(false)
                setPlasticsurgery(false)
                setAnesthesiology(false)
                setObstetrics(false)
                setPediatrics(false)
                setOphthalmology(false)
                setDermatology(false)
                setOtorhinolaryngology(false)
                setUrology(false)
                setRadiology(true)
                setRadiation(false)
                setPathology(false)
                setLaboratory(false)
                setTuberculosis(false)
                setRehabilitation(false)
                setPreventive(false)
                setFamilymedicine(false)
                setEmergency(false)
                setNuclear(false)
                setOccupational(false)
                break;
            case 'radiation':
                setMedicine(false)
                setNeurology(false)
                setPsychiatry(false)
                setSurgery(false)
                setOrthopedics(false)
                setNeurosurgery(false)
                setThoracicsurgery(false)
                setPlasticsurgery(false)
                setAnesthesiology(false)
                setObstetrics(false)
                setPediatrics(false)
                setOphthalmology(false)
                setDermatology(false)
                setOtorhinolaryngology(false)
                setUrology(false)
                setRadiology(false)
                setRadiation(true)
                setPathology(false)
                setLaboratory(false)
                setTuberculosis(false)
                setRehabilitation(false)
                setPreventive(false)
                setFamilymedicine(false)
                setEmergency(false)
                setNuclear(false)
                setOccupational(false)
                break;
            case 'pathology':
                setMedicine(false)
                setNeurology(false)
                setPsychiatry(false)
                setSurgery(false)
                setOrthopedics(false)
                setNeurosurgery(false)
                setThoracicsurgery(false)
                setPlasticsurgery(false)
                setAnesthesiology(false)
                setObstetrics(false)
                setPediatrics(false)
                setOphthalmology(false)
                setDermatology(false)
                setOtorhinolaryngology(false)
                setUrology(false)
                setRadiology(false)
                setRadiation(false)
                setPathology(true)
                setLaboratory(false)
                setTuberculosis(false)
                setRehabilitation(false)
                setPreventive(false)
                setFamilymedicine(false)
                setEmergency(false)
                setNuclear(false)
                setOccupational(false)
                break;
            case 'laboratory':
                setMedicine(false)
                setNeurology(false)
                setPsychiatry(false)
                setSurgery(false)
                setOrthopedics(false)
                setNeurosurgery(false)
                setThoracicsurgery(false)
                setPlasticsurgery(false)
                setAnesthesiology(false)
                setObstetrics(false)
                setPediatrics(false)
                setOphthalmology(false)
                setDermatology(false)
                setOtorhinolaryngology(false)
                setUrology(false)
                setRadiology(false)
                setRadiation(false)
                setPathology(false)
                setLaboratory(true)
                setTuberculosis(false)
                setRehabilitation(false)
                setPreventive(false)
                setFamilymedicine(false)
                setEmergency(false)
                setNuclear(false)
                setOccupational(false)
                break;
            case 'tuberculosis':
                setMedicine(false)
                setNeurology(false)
                setPsychiatry(false)
                setSurgery(false)
                setOrthopedics(false)
                setNeurosurgery(false)
                setThoracicsurgery(false)
                setPlasticsurgery(false)
                setAnesthesiology(false)
                setObstetrics(false)
                setPediatrics(false)
                setOphthalmology(false)
                setDermatology(false)
                setOtorhinolaryngology(false)
                setUrology(false)
                setRadiology(false)
                setRadiation(false)
                setPathology(false)
                setLaboratory(false)
                setTuberculosis(true)
                setRehabilitation(false)
                setPreventive(false)
                setFamilymedicine(false)
                setEmergency(false)
                setNuclear(false)
                setOccupational(false)
                break;
            case 'rehabilitation':
                setMedicine(false)
                setNeurology(false)
                setPsychiatry(false)
                setSurgery(false)
                setOrthopedics(false)
                setNeurosurgery(false)
                setThoracicsurgery(false)
                setPlasticsurgery(false)
                setAnesthesiology(false)
                setObstetrics(false)
                setPediatrics(false)
                setOphthalmology(false)
                setDermatology(false)
                setOtorhinolaryngology(false)
                setUrology(false)
                setRadiology(false)
                setRadiation(false)
                setPathology(false)
                setLaboratory(false)
                setTuberculosis(false)
                setRehabilitation(true)
                setPreventive(false)
                setFamilymedicine(false)
                setEmergency(false)
                setNuclear(false)
                setOccupational(false)
                break;
            case 'preventive':
                setMedicine(false)
                setNeurology(false)
                setPsychiatry(false)
                setSurgery(false)
                setOrthopedics(false)
                setNeurosurgery(false)
                setThoracicsurgery(false)
                setPlasticsurgery(false)
                setAnesthesiology(false)
                setObstetrics(false)
                setPediatrics(false)
                setOphthalmology(false)
                setDermatology(false)
                setOtorhinolaryngology(false)
                setUrology(false)
                setRadiology(false)
                setRadiation(false)
                setPathology(false)
                setLaboratory(false)
                setTuberculosis(false)
                setRehabilitation(false)
                setPreventive(true)
                setFamilymedicine(false)
                setEmergency(false)
                setNuclear(false)
                setOccupational(false)
                break;
            case 'familymedicine':
                setMedicine(false)
                setNeurology(false)
                setPsychiatry(false)
                setSurgery(false)
                setOrthopedics(false)
                setNeurosurgery(false)
                setThoracicsurgery(false)
                setPlasticsurgery(false)
                setAnesthesiology(false)
                setObstetrics(false)
                setPediatrics(false)
                setOphthalmology(false)
                setDermatology(false)
                setOtorhinolaryngology(false)
                setUrology(false)
                setRadiology(false)
                setRadiation(false)
                setPathology(false)
                setLaboratory(false)
                setTuberculosis(false)
                setRehabilitation(false)
                setPreventive(false)
                setFamilymedicine(true)
                setEmergency(false)
                setNuclear(false)
                setOccupational(false)
                break;
            case 'emergency':
                setMedicine(false)
                setNeurology(false)
                setPsychiatry(false)
                setSurgery(false)
                setOrthopedics(false)
                setNeurosurgery(false)
                setThoracicsurgery(false)
                setPlasticsurgery(false)
                setAnesthesiology(false)
                setObstetrics(false)
                setPediatrics(false)
                setOphthalmology(false)
                setDermatology(false)
                setOtorhinolaryngology(false)
                setUrology(false)
                setRadiology(false)
                setRadiation(false)
                setPathology(false)
                setLaboratory(false)
                setTuberculosis(false)
                setRehabilitation(false)
                setPreventive(false)
                setFamilymedicine(false)
                setEmergency(true)
                setNuclear(false)
                setOccupational(false)
                break;
            case 'nuclear':
                setMedicine(false)
                setNeurology(false)
                setPsychiatry(false)
                setSurgery(false)
                setOrthopedics(false)
                setNeurosurgery(false)
                setThoracicsurgery(false)
                setPlasticsurgery(false)
                setAnesthesiology(false)
                setObstetrics(false)
                setPediatrics(false)
                setOphthalmology(false)
                setDermatology(false)
                setOtorhinolaryngology(false)
                setUrology(false)
                setRadiology(false)
                setRadiation(false)
                setPathology(false)
                setLaboratory(false)
                setTuberculosis(false)
                setRehabilitation(false)
                setPreventive(false)
                setFamilymedicine(false)
                setEmergency(false)
                setNuclear(true)
                setOccupational(false)
                break;
            case 'occupational':
                setMedicine(false)
                setNeurology(false)
                setPsychiatry(false)
                setSurgery(false)
                setOrthopedics(false)
                setNeurosurgery(false)
                setThoracicsurgery(false)
                setPlasticsurgery(false)
                setAnesthesiology(false)
                setObstetrics(false)
                setPediatrics(false)
                setOphthalmology(false)
                setDermatology(false)
                setOtorhinolaryngology(false)
                setUrology(false)
                setRadiology(false)
                setRadiation(false)
                setPathology(false)
                setLaboratory(false)
                setTuberculosis(false)
                setRehabilitation(false)
                setPreventive(false)
                setFamilymedicine(false)
                setEmergency(false)
                setNuclear(false)
                setOccupational(true)
                break;
            default:
                break;
        }
    }

    const getMyInfo = async () => {
        try {
            const response = await axios.get('/consultative/consultativeInfoAll');
            const myInfo = response.data;
            console.log(myInfo);
            setCId(myInfo.cid);
            setCPw(myInfo.cpw);
            setCName(myInfo.cname);
            setCEmail(myInfo.cemail);
            setCTel(myInfo.ctel);
            setCPhone(myInfo.cphone)
            setHospName(myInfo.hospName);
            setHospTel(myInfo.hospTel);
            setHospFx(myInfo.hospFx);
            setHospNum(myInfo.hospNum);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(()=> {
        getMyInfo();
        selectCRole(myInfo.crole);
        selectDepartment(myInfo.department);
    }, [])

    useEffect(()=>{
        if(cRole && department && cPw && cName && cEmail && cTel && cPhone && cAddress && hospName && hospTel && hospFx && hospNum && hospAddress){
            setInfoEmpty(true);
        } else{
            setInfoEmpty(false)
        }
    }, [cRole, department, cPw,  cName,  cEmail,  cTel,  cPhone,  cAddress,  hospName,  hospTel,  hospFx,  hospNum,  hospAddress])

    const radio_select_cRole = e => {
        selectCRole(e.target.value)
        setCRole(e.target.value)
    }

    const radio_select_department = e => {
        selectDepartment(e.target.value)
        setDepartment(e.target.value)
    }

    const changeMyPw = e => {
        navigate('/medic/mypage/ChangeConsultativeInfo/ChangeMyPw', {state:{cpw : cPw}})
    }
    const input_email = e => {
        setCEmail(e.target.value)
    }
    const input_tel = e => {
        setCTel(e.target.value)
    }
    const input_phone = e => {
        setCPhone(e.target.value)
    }
    const input_zipcode_num = e => {
        setZipcodeNum(e.target.value)
    }
    const input_zipcode = e => {
        setZipcode(e.target.value)
    }
    const input_details_zipcode = e => {
        const cadd = zipcodeNum + " " + zipcode + " " + e.target.value
        setDetailAddress(e.target.value)
        setCAddress(cadd)
    }
    const input_hosp_name = e => {
        setHospName(e.target.value)
    }
    const input_hosp_tel = e => {
        setHospTel(e.target.value)
    }
    const input_hosp_fx = e => {
        setHospFx(e.target.value)
    }
    const input_hosp_num = e => {
        setHospNum(e.target.value)
    }
    const input_hosp_zipcode_num = e => {
        setHpZipcodeNum(e.target.value)
    }
    const input_hosp_zipcode = e => {
        setHpZipcode(e.target.value)
    }
    const input_hp_details_zipcode = e => {
        const hpadd = hpZipcodeNum + " " + hpZipcode + " " + e.target.value
        setDetailHpAddress(e.target.value)
        setHospAddress(hpadd)
    }
    const consultative_modify = async(consultativeInfo) => {
        console.log(2)
        const response = await axios.put('/consultative/modifyConsultativeInfo', consultativeInfo)
        console.log(response)
        if(response.data === '정보수정 완료!'){
            alert('정보수정이 완료되었습니다.')
            navigate('/medic/consultativeMypage')
        }
    }

    const btn_progrm_modify = e => {
        if(window.confirm("수정하시겠습니까?")){
        e.preventDefault()
        const consultativeInfo = {
            'cRole' : cRole,
            'department' : department,
            'cPw' : cPw,
            'cName' : cName,
            'cEmail' : cEmail,
            'cTel' : cTel,
            'cPhone' : cPhone,
            'cAddress' : cAddress,
            'hospName' : hospName,
            'hospTel' : hospTel,
            'hospFx' : hospFx,
            'hospNum' : hospNum,
            'hospAddress' : hospAddress,
        } 
        consultative_modify(consultativeInfo)
    }
}
    const btn_progrm_deleteConsultative = async() => {
        try{
            const response = await axios.delete('/consultative/deleteConsultative')
            if(response.data === '탈퇴 완료'){
                alert('탈퇴가 정상적으로 이루어졌습니다.')
                cookie.remove("cId")
                navigate('/')
            }
        } catch(err){
            console.log("오류")
        }
    }
    
    const btn_goto_mypage = e => {
        navigate('/medic/consultativeMypage')
    
    }
    return(
        <div className={ChangeConsultativeInfo.join_wrap}>
            <div className={ChangeConsultativeInfo.iconbox}>
                <h2>
                    <i className="fa-solid fa-circle icon"></i>
                    내 정보 수정
                </h2>
            </div>
            <div className={ChangeConsultativeInfo.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    가입자 정보
                </h3>
            </div>
            <div className = {ChangeConsultativeInfo.tb}>
                <table className={ChangeConsultativeInfo.joinpage_table}>
                    <tr>
                        <td className={ChangeConsultativeInfo.joinpage_th}>
                            회원구분
                        </td>
                        <td colSpan="3" className={ChangeConsultativeInfo.joinpage_td}>
                            <input type="radio" name="user_role" value="consultative" checked={consultative} onChange={radio_select_cRole}/>전문의
                        </td>
                    </tr>

                    <tr>
                        <td className={ChangeConsultativeInfo.joinpage_th}>
                            진료과목
                        </td>
                        <td colSpan="3" className={ChangeConsultativeInfo.joinpage_td}>
                            <input type="radio" name="department" value="medicine" checked={medicine} onChange={radio_select_department}/>내과
                            <input type="radio" name="department" value="neurology" checked={neurology} onChange={radio_select_department}/>신경과
                            <input type="radio" name="department" value="psychiatry" checked={psychiatry} onChange={radio_select_department}/>정신건강의학과
                            <input type="radio" name="department" value="surgery" checked={surgery} onChange={radio_select_department}/>외과
                            <input type="radio" name="department" value="orthopedics" checked={orthopedics} onChange={radio_select_department}/>정형외과
                            <input type="radio" name="department" value="neurosurgery" checked={neurosurgery} onChange={radio_select_department}/>신경외과
                            <input type="radio" name="department" value="thoracicsurgery" checked={thoracicsurgery} onChange={radio_select_department}/>흉부외과
                            <input type="radio" name="department" value="plasticsurgery" checked={plasticsurgery} onChange={radio_select_department}/>성형외과
                            <input type="radio" name="department" value="anesthesiology" checked={anesthesiology} onChange={radio_select_department}/>마취통증의학과
                            <input type="radio" name="department" value="obstetrics" checked={obstetrics} onChange={radio_select_department}/>산부인과
                            <input type="radio" name="department" value="pediatrics" checked={pediatrics} onChange={radio_select_department}/>소아청소년과
                            <input type="radio" name="department" value="ophthalmology" checked={ophthalmology} onChange={radio_select_department}/>안과
                            <input type="radio" name="department" value="otorhinolaryngology" checked={otorhinolaryngology} onChange={radio_select_department}/>이비인후과
                            <input type="radio" name="department" value="dermatology" checked={dermatology} onChange={radio_select_department}/>피부과
                            <input type="radio" name="department" value="urology" checked={urology} onChange={radio_select_department}/>비뇨의학과
                            <input type="radio" name="department" value="radiology" checked={radiology} onChange={radio_select_department}/>영상의학과
                            <input type="radio" name="department" value="radiation" checked={radiation} onChange={radio_select_department}/>방사선종양학과
                            <input type="radio" name="department" value="pathology" checked={pathology} onChange={radio_select_department}/>병리과
                            <input type="radio" name="department" value="laboratory" checked={laboratory} onChange={radio_select_department}/>진단검사의학과
                            <input type="radio" name="department" value="tuberculosis" checked={tuberculosis} onChange={radio_select_department}/>결핵과
                            <input type="radio" name="department" value="rehabilitation " checked={rehabilitation} onChange={radio_select_department}/>재활의학과
                            <input type="radio" name="department" value="preventive" checked={preventive} onChange={radio_select_department}/>예방의학과
                            <input type="radio" name="department" value="familymedicine" checked={familymedicine} onChange={radio_select_department}/>가정의학과
                            <input type="radio" name="department" value="emergency" checked={emergency} onChange={radio_select_department}/>응급의학과
                            <input type="radio" name="department" value="nuclear" checked={nuclear} onChange={radio_select_department}/>핵의학과
                            <input type="radio" name="department" value="occupational" checked={occupational} onChange={radio_select_department}/>직업환경의학과
                        </td>
                    </tr>

                    <tr>
                        <td className={ChangeConsultativeInfo.joinpage_th}>
                            아이디
                        </td>
                        <td colSpan="3" className={ChangeConsultativeInfo.joinpage_td}>
                            <div className={ChangeConsultativeInfo.id}>
                                <input type="text" value={cId} disabled />
                            </div>
                        </td>
                    </tr>

                    <tr style={{borderRight : '1px solid black'}}>
                        <td className={ChangeConsultativeInfo.joinpage_th}>
                            비밀번호
                        </td>
                        <td className={ChangeConsultativeInfo.joinpage_td} style={{borderRight : 'none'}}>
                            <input type="password" name="pw" disabled={true} value={cPw} maxLength={15}/>
                            <button type="button"  className={ChangeConsultativeInfo.btt_id} onClick={changeMyPw}>비밀번호 재설정</button>
                        </td>
                    </tr>
                    <tr>
                        <td className={ChangeConsultativeInfo.joinpage_td}>
                            회원명
                        </td>
                        <td className={ChangeConsultativeInfo.joinpage_td}>
                            {cName}
                        </td>
                        <td className={ChangeConsultativeInfo.joinpage_td}>
                            이메일
                        </td>
                        <td className={ChangeConsultativeInfo.joinpage_td}>
                            <input type="text" name="email" value={cEmail}  onChange={input_email} maxLength={30}/>
                        </td>
                    </tr>

                    <tr>
                        <td className={ChangeConsultativeInfo.joinpage_td}>
                            일반전화
                        </td>
                        <td className={ChangeConsultativeInfo.joinpage_td}>
                            <input type="text" name="tel" value={cTel} onChange={input_tel} maxLength={13}/>
                        </td>
                        <td className={ChangeConsultativeInfo.joinpage_td}>
                            휴대폰번호
                        </td>
                        <td className={ChangeConsultativeInfo.joinpage_td}>
                            <input type="text" name="phone" value={cPhone} onChange={input_phone} maxLength={13}/>
                        </td>
                    </tr>

                    <tr className={ChangeConsultativeInfo.joinpage_zipcode_tb}>
                        <td className={ChangeConsultativeInfo.joinpage_td}>
                            주소
                        </td>
                        <td colSpan="4" className={ChangeConsultativeInfo.joinpage_td}>
                            <div className={ChangeConsultativeInfo.joinpage_zipcode}>
                                <input type="text" name="zipcode_num" value={zipcodeNum} onChange={input_zipcode_num} maxLength={5}/>
                                <button type="button" onClick={() => alert('우편번호')} className={ChangeConsultativeInfo.joinpage_zipcode_btn}>우편번호</button>
                                <br/>
                                <input type="text" name="zipcode" value={zipcode} onChange={input_zipcode} maxLength={80}/><br/>
                                <input type="text" name="details_zipcode" value={detailAddress} onChange={input_details_zipcode} maxLength={15}/>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div className={ChangeConsultativeInfo.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    병원 정보
                </h3>
            </div>    
            <div className={`${ChangeConsultativeInfo.joinpage_table} ${ChangeConsultativeInfo.tb}`}>
            <table className={ChangeConsultativeInfo.joinpage_table}>
                <tr>
                    <td className={ChangeConsultativeInfo.joinpage_th}>
                        소속 병원명
                    </td>
                    <td className={ChangeConsultativeInfo.joinpage_td}>
                        <input type="text" name="hosp_name" value={hospName} onChange={input_hosp_name} maxLength={20}/>
                    </td>
                    <td className={ChangeConsultativeInfo.joinpage_th}>
                        대표자명
                    </td>
                    <td className={ChangeConsultativeInfo.joinpage_td}>
                        대표자명
                    </td>
                </tr>
                <tr>
                    <td className={ChangeConsultativeInfo.joinpage_th}>
                        일반전화
                    </td>
                    <td className={ChangeConsultativeInfo.joinpage_td}>
                        <input type="text" name="hosp_tel" value={hospTel} onChange={input_hosp_tel} maxLength={13}/>
                    </td>
                    <td className={ChangeConsultativeInfo.joinpage_th}>
                        팩스번호
                    </td>
                    <td className={ChangeConsultativeInfo.joinpage_td}>
                        <input type="text" name="hosp_fx" value={hospFx} onChange={input_hosp_fx} maxLength={15}/>
                    </td>
                </tr>
                <tr>
                    <td className={ChangeConsultativeInfo.joinpage_th}>
                        사업자번호(법인)
                    </td>
                    <td colSpan="4" className={ChangeConsultativeInfo.joinpage_td}>
                        <input type="text" name="hosp_num" value={hospNum} onChange={input_hosp_num} maxLength={20}/>
                    </td>
                </tr>
                <tr className={ChangeConsultativeInfo.zipcode_tb}>
                    <td className={ChangeConsultativeInfo.joinpage_th}>
                        사업장 주소
                    </td>
                    <td colSpan="4" className={ChangeConsultativeInfo.joinpage_td}>
                        <div className={ChangeConsultativeInfo.zipcode}>
                            <input type="text" name="hosp_zipcode_num" value={hpZipcodeNum} onChange={input_hosp_zipcode_num} maxLength={5}/>
                            <button type="button" onClick={() => alert('우편번호')} className={ChangeConsultativeInfo.zipcode}>우편번호</button>
                            <br />
                            <input type="text" name="hosp_zipcode" value={hpZipcode} onChange={input_hosp_zipcode} maxLength={80}/><br />
                            <input type="text" name="hp_details_zipcode" value={detailHpAddress} onChange={input_hp_details_zipcode} maxLength={15}/>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div className={ChangeConsultativeInfo.complete} style={{width: '550px'}}>
            <button type = "button" onClick={btn_progrm_modify} disabled={!infoEmpty} className={ChangeConsultativeInfo.btt_complete}>정보 수정 완료</button>
            <button type = "button" onClick={btn_goto_mypage} className={ChangeConsultativeInfo.btt_complete}>목록</button>
            <button type = "button" onClick={btn_progrm_deleteConsultative} className={ChangeConsultativeInfo.btt_complete}>회원탈퇴</button>
        </div>
        </div>
    )
}